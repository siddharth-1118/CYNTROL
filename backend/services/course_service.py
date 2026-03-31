import re
from bs4 import BeautifulSoup
from utils.text import TextUtils

class CourseService:
    @staticmethod
    def _normalize_header(text):
        return re.sub(r"[^a-z0-9]+", " ", (text or "").lower()).strip()

    @staticmethod
    def _find_table(soup):
        for table in soup.find_all("table"):
            if "Course Code" in table.get_text():
                return table
        return None

    @staticmethod
    def _find_header_map(table):
        for row in table.find_all("tr"):
            cells = row.find_all(["th", "td"])
            if not cells:
                continue

            headers = [CourseService._normalize_header(TextUtils.clean(cell.get_text())) for cell in cells]
            if "course code" not in headers or "course title" not in headers:
                continue

            header_map = {}
            for idx, header in enumerate(headers):
                if header == "course code":
                    header_map["code"] = idx
                elif header == "course title":
                    header_map["name"] = idx
                elif header == "credits":
                    header_map["credits"] = idx
                elif header in {"course type", "type"}:
                    header_map["raw_type"] = idx
                elif header == "faculty":
                    header_map["faculty"] = idx
                elif header == "slot":
                    header_map["slot"] = idx
                elif header in {"class room", "room", "venue"}:
                    header_map["room"] = idx

            if "code" in header_map and "name" in header_map:
                return header_map, row

        return None, None

    @staticmethod
    def get_course_map(html_content):
        if not html_content: return {}
        soup = BeautifulSoup(html_content, "html.parser")
        course_map = {}
        table = CourseService._find_table(soup)
        if not table:
            return {}

        header_map, header_row = CourseService._find_header_map(table)
        rows = table.find_all("tr")

        if header_map:
            start_parsing = False
            for row in rows:
                if row is header_row:
                    start_parsing = True
                    continue
                if not start_parsing:
                    continue

                cols = row.find_all("td")
                if not cols:
                    continue

                try:
                    c_code = TextUtils.clean(cols[header_map["code"]].get_text())
                    c_name = TextUtils.clean(cols[header_map["name"]].get_text())
                except IndexError:
                    continue

                if not c_code or not c_name:
                    continue

                c_credits = TextUtils.clean(cols[header_map.get("credits", -1)].get_text()) if "credits" in header_map else ""
                c_type_raw = TextUtils.clean(cols[header_map.get("raw_type", -1)].get_text()) if "raw_type" in header_map else ""
                c_faculty = TextUtils.clean(cols[header_map.get("faculty", -1)].get_text()) if "faculty" in header_map else ""
                c_slot_raw = TextUtils.clean(cols[header_map.get("slot", -1)].get_text()) if "slot" in header_map else ""
                c_room = TextUtils.clean(cols[header_map.get("room", -1)].get_text()) if "room" in header_map else ""

                if "Lab Based" in c_faculty:
                    c_faculty = "Unknown"

                course_data = {
                    "code": c_code,
                    "name": c_name,
                    "credits": c_credits,
                    "raw_type": c_type_raw,
                    "faculty": c_faculty,
                    "room": c_room,
                    "slot": c_slot_raw,
                }

                clean_slots = [
                    s.strip()
                    for s in re.split(r"[\s,\/+\-]+", c_slot_raw)
                    if s.strip()
                ]
                for slot in clean_slots:
                    is_prac_slot = slot.upper().startswith("P") or slot.upper().startswith("L") or slot.upper() == "LAB"
                    final_data = course_data.copy()
                    final_data["type"] = "Practical" if is_prac_slot else "Theory"
                    course_map[slot] = final_data

            return course_map

        all_cells = table.find_all("td")
        col_count = 11
        start_index = 0
        for i, cell in enumerate(all_cells):
            txt = TextUtils.clean(cell.get_text())
            if txt == "1" and i + 1 < len(all_cells):
                next_txt = TextUtils.clean(all_cells[i + 1].get_text())
                if re.match(r"^\d+", next_txt) or len(next_txt) > 4:
                    start_index = i
                    break

        current_idx = start_index
        while current_idx + 10 < len(all_cells):
            try:
                cols = all_cells[current_idx : current_idx + col_count]
                c_code = TextUtils.clean(cols[1].get_text())
                c_name = TextUtils.clean(cols[2].get_text())
                c_credits = TextUtils.clean(cols[3].get_text())
                c_type_raw = TextUtils.clean(cols[6].get_text())
                c_faculty = TextUtils.clean(cols[7].get_text())
                c_slot_raw = TextUtils.clean(cols[8].get_text())
                c_room = TextUtils.clean(cols[9].get_text())
                if not c_code or len(c_code) < 3:
                    current_idx += col_count
                    continue
                if "Lab Based" in c_faculty:
                    c_faculty = "Unknown"

                course_data = {
                    "code": c_code,
                    "name": c_name,
                    "credits": c_credits,
                    "raw_type": c_type_raw,
                    "faculty": c_faculty,
                    "room": c_room,
                    "slot": c_slot_raw,
                }

                clean_slots = [
                    s.strip()
                    for s in re.split(r"[\s,\/+\-]+", c_slot_raw)
                    if s.strip()
                ]
                for slot in clean_slots:
                    is_prac_slot = slot.upper().startswith("P") or slot.upper().startswith("L") or slot.upper() == "LAB"
                    final_data = course_data.copy()
                    final_data["type"] = "Practical" if is_prac_slot else "Theory"
                    course_map[slot] = final_data

                current_idx += col_count
            except IndexError:
                break
        return course_map
