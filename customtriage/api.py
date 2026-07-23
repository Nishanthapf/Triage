import frappe
from datetime import date, timedelta
from collections import defaultdict


CONDITION_FIELDS = [
    ("screening_for_hypertension", "Screening for Hypertension"),
    ("screening_for_diebetes",     "Screening for Diabetes"),
    ("diabetic_follow_up",         "Diabetes Followup"),
    ("hypertension_follow_up",     "Hypertension Follow up"),
    ("respiratory_issue",          "Respiratory Issue"),
    ("chest_pain",                 "Chest Pain"),
    ("abdominal_pain",             "Abdominal Pain"),
    ("diarrhea",                   "Diarrhea"),
    ("vomiting",                   "Vomiting"),
    ("back_pain_and_neck_pain",    "Back and Neck Pain"),
    ("shoulder_and_hand_pain",     "Shoulder and Hand Pain"),
    ("leg_or_knee_or_hip_pain",    "Leg or Knee or Hip Pain"),
    ("foot_and_ankle_pain",        "Foot and Ankle Pain"),
    ("anemia_adolescent",          "Anemia - Adolescent"),
    ("anemia_children",            "Anemia - Children"),
    ("pregnancy_care",             "Pregnancy Care"),
    ("postnatal_care",             "Postnatal Care"),
    ("thyroid_problem",            "Thyroid Problem"),
    ("skin_problem",               "Skin Problem"),
    ("lymph_node",                 "Lymph Node Enlargement"),
    ("jaundice",                   "Jaundice"),
    ("headache",                   "Headache"),
    ("dyspepsia",                  "Dyspepsia"),
    ("fatigue",                    "Fatigue"),
    ("eye_problem",                "Eye Problem"),
    ("constipation",               "Constipation"),
]

COMORBIDITY_FIELDS = [
    ("hypertension",   "Hypertension"),
    ("diabetes",       "Diabetes"),
    ("cancer",         "Cancer"),
    ("thyroid_issues", "Thyroid"),
    ("drug_abuse",     "Drug Abuse"),
]

FETCH_FIELDS = [
    "name", "patient_unique_id", "patient_name", "age", "gender",
    "community_name", "created_by", "date", "bmi_category", "primary_diagnosis",
    "hypertension", "diabetes", "cancer", "thyroid_issues", "drug_abuse",
    "chest_pain", "respiratory_issue", "screening_for_hypertension",
    "screening_for_diebetes", "diabetic_follow_up", "hypertension_follow_up",
    "abdominal_pain", "diarrhea", "vomiting", "back_pain_and_neck_pain",
    "shoulder_and_hand_pain", "leg_or_knee_or_hip_pain", "foot_and_ankle_pain",
    "anemia_adolescent", "anemia_children", "pregnancy_care", "postnatal_care",
    "thyroid_problem", "skin_problem", "lymph_node", "jaundice", "headache",
    "dyspepsia", "fatigue", "eye_problem", "constipation",
]


@frappe.whitelist()
def get_triage_data(from_date=None, to_date=None, community=None, gender=None,
                    nurse=None, trend_days=30):
    user = frappe.session.user
    is_admin = "System Manager" in frappe.get_roles(user)

    try:
        trend_days = int(trend_days)
    except (ValueError, TypeError):
        trend_days = 30

    # ── Build filters ────────────────────────────────────────────────────
    filters = {"docstatus": ["<", 2]}

    if from_date and to_date:
        filters["date"] = ["between", [from_date + " 00:00:00", to_date + " 23:59:59"]]
    elif from_date:
        filters["date"] = [">=", from_date + " 00:00:00"]
    elif to_date:
        filters["date"] = ["<=", to_date + " 23:59:59"]

    if community:
        filters["community_name"] = community
    if gender:
        filters["gender"] = gender
    if is_admin and nurse:
        filters["created_by"] = nurse
    if not is_admin:
        filters["created_by"] = user

    # ── Fetch records ────────────────────────────────────────────────────
    records = frappe.get_list(
        "Nurse Interventions",
        filters=filters,
        fields=FETCH_FIELDS,
        order_by="date desc",
        limit=0,
    )

    # Normalise visit_date to YYYY-MM-DD string
    for r in records:
        d = r.get("date")
        if d:
            r["visit_date"] = d.date().isoformat() if hasattr(d, "date") else str(d)[:10]
        else:
            r["visit_date"] = ""

    # ── Summary KPIs ─────────────────────────────────────────────────────
    today_str     = date.today().isoformat()
    yesterday_str = (date.today() - timedelta(days=1)).isoformat()
    month_start   = date.today().replace(day=1).isoformat()

    total          = len(records)
    today_count    = sum(1 for r in records if r.get("visit_date") == today_str)
    yesterday_count= sum(1 for r in records if r.get("visit_date") == yesterday_str)
    month_count    = sum(1 for r in records if r.get("visit_date", "") >= month_start)
    htn_count      = sum(1 for r in records if r.get("screening_for_hypertension") == 1)
    dm_count       = sum(1 for r in records if r.get("screening_for_diebetes") == 1)
    redflag_count  = sum(1 for r in records if r.get("chest_pain") == 1)

    if yesterday_count:
        today_delta = round(((today_count - yesterday_count) / yesterday_count) * 100)
    elif today_count:
        today_delta = 100
    else:
        today_delta = 0

    summary = {
        "total_patients":         total,
        "today_patients":         today_count,
        "this_month_patients":    month_count,
        "hypertension_screenings": htn_count,
        "diabetes_screenings":    dm_count,
        "red_flag_patients":      redflag_count,
        "today_delta":            today_delta,
        "active_nurses":          len({r.get("created_by") for r in records if r.get("created_by")}),
        "communities_covered":    len({r.get("community_name") for r in records if r.get("community_name")}),
    }

    # ── Lists for filter dropdowns ───────────────────────────────────────
    communities = sorted({r.get("community_name") for r in records if r.get("community_name")})
    nurses_list = sorted({r.get("created_by") for r in records if r.get("created_by")}) if is_admin else []

    # ── Condition distribution ───────────────────────────────────────────
    conditions = sorted(
        [{"condition": lbl, "count": sum(1 for r in records if r.get(fn) == 1)}
         for fn, lbl in CONDITION_FIELDS if sum(1 for r in records if r.get(fn) == 1) > 0],
        key=lambda x: -x["count"]
    )

    # ── Gender ───────────────────────────────────────────────────────────
    gender_counts = defaultdict(int)
    for r in records:
        gender_counts[r.get("gender") or "Unknown"] += 1
    gender_data = [{"gender": k, "count": v}
                   for k, v in sorted(gender_counts.items(), key=lambda x: -x[1])]

    # ── Age groups (decade-based) ─────────────────────────────────────────
    AGE_BUCKETS = [
        (0,  9,  "0-9 Child"),
        (10, 19, "10-19 Adolescent"),
        (20, 29, "20-29 Young Adult"),
        (30, 39, "30-39 Adult"),
        (40, 49, "40-49 Middle-Aged"),
        (50, 59, "50-59 Senior"),
        (60, 999,"60+ Elderly"),
    ]
    age_buckets = {b[2]: 0 for b in AGE_BUCKETS}
    for r in records:
        try:
            a = int(r.get("age") or 0)
        except (ValueError, TypeError):
            a = 0
        for lo, hi, label in AGE_BUCKETS:
            if lo <= a <= hi:
                age_buckets[label] += 1
                break
    age_data = [{"age_group": k, "count": v} for k, v in age_buckets.items() if v > 0]

    # ── BMI ──────────────────────────────────────────────────────────────
    bmi_counts = defaultdict(int)
    for r in records:
        cat = r.get("bmi_category") or ""
        if cat:
            bmi_counts[cat] += 1
    bmi_data = [{"category": k, "count": v}
                for k, v in sorted(bmi_counts.items(), key=lambda x: -x[1])]

    # ── Comorbidities ────────────────────────────────────────────────────
    comorbidities = [
        {"comorbidity": lbl, "count": sum(1 for r in records if r.get(fn) == 1)}
        for fn, lbl in COMORBIDITY_FIELDS
    ]

    # ── Trend (daily counts for last N days) ─────────────────────────────
    trend_end   = date.today()
    trend_start = trend_end - timedelta(days=trend_days - 1)
    trend_map   = {}
    d_iter = trend_start
    while d_iter <= trend_end:
        trend_map[d_iter.isoformat()] = 0
        d_iter += timedelta(days=1)
    for r in records:
        vd = r.get("visit_date", "")
        if vd in trend_map:
            trend_map[vd] += 1
    trend_data = [{"date": k, "count": v} for k, v in sorted(trend_map.items())]

    # ── Community breakdown ───────────────────────────────────────────────
    comm_counts = defaultdict(int)
    for r in records:
        c = r.get("community_name") or ""
        if c:
            comm_counts[c] += 1
    comm_data = [{"community": k, "count": v}
                 for k, v in sorted(comm_counts.items(), key=lambda x: -x[1])]

    # ── Nurse stats (admin only) ──────────────────────────────────────────
    nurse_stats = []
    if is_admin:
        nmap = defaultdict(lambda: {
            "total": 0, "days": set(), "communities": set(), "htn": 0, "dm": 0, "chest": 0
        })
        for r in records:
            n = r.get("created_by") or "Unknown"
            nmap[n]["total"] += 1
            if r.get("visit_date"):
                nmap[n]["days"].add(r["visit_date"])
            if r.get("community_name"):
                nmap[n]["communities"].add(r["community_name"])
            if r.get("screening_for_hypertension") == 1:
                nmap[n]["htn"] += 1
            if r.get("screening_for_diebetes") == 1:
                nmap[n]["dm"] += 1
            if r.get("chest_pain") == 1:
                nmap[n]["chest"] += 1
        nurse_stats = sorted([
            {
                "nurse":                  n,
                "total_patients":         v["total"],
                "active_days":            len(v["days"]),
                "communities_covered":    len(v["communities"]),
                "hypertension_screens":   v["htn"],
                "diabetes_screens":       v["dm"],
                "chest_pain_cases":       v["chest"],
            }
            for n, v in nmap.items()
        ], key=lambda x: -x["total_patients"])

    # ── Recent patients (last 50) ─────────────────────────────────────────
    recent_fields = [
        "name", "patient_unique_id", "patient_name", "age", "gender",
        "community_name", "created_by", "visit_date", "bmi_category",
        "primary_diagnosis", "hypertension", "diabetes", "chest_pain",
        "respiratory_issue", "screening_for_hypertension", "screening_for_diebetes",
        "diabetic_follow_up", "hypertension_follow_up", "pregnancy_care",
        "diarrhea", "headache",
    ]
    def _risk(r):
        return "High" if r.get("chest_pain") == 1 else "Low"
    recent = [{**{k: r.get(k) for k in recent_fields}, "risk": _risk(r)} for r in records[:50]]

    # ── Red flag patients ─────────────────────────────────────────────────
    red_flags = [r for r in recent if r.get("chest_pain") == 1]

    # ── All records for summary download center ───────────────────────────
    all_records = [
        {
            "name":              r.get("name"),
            "patient_unique_id": r.get("patient_unique_id"),
            "patient_name":      r.get("patient_name"),
            "age":               r.get("age"),
            "gender":            r.get("gender"),
            "community_name":    r.get("community_name"),
            "visit_date":        r.get("visit_date"),
            "primary_diagnosis": r.get("primary_diagnosis"),
        }
        for r in records
    ]

    # ── Diagnosis options for filter dropdown ─────────────────────────────
    diagnosis_options = sorted({r.get("primary_diagnosis") for r in records
                                 if r.get("primary_diagnosis")})

    # ── Red flag breakdown ────────────────────────────────────────────────
    rf_counts = defaultdict(int)
    for r in records:
        if r.get("chest_pain") == 1:
            for fn, lbl in CONDITION_FIELDS:
                if fn != "chest_pain" and r.get(fn) == 1:
                    rf_counts[lbl] += 1
    red_flag_breakdown = [{"diagnosis": k, "count": v}
                          for k, v in sorted(rf_counts.items(), key=lambda x: -x[1])]

    return {
        "is_admin":           is_admin,
        "communities":        communities,
        "nurses":             nurses_list,
        "summary":            summary,
        "conditions":         conditions,
        "gender":             gender_data,
        "age_groups":         age_data,
        "bmi":                bmi_data,
        "comorbidities":      comorbidities,
        "trend":              trend_data,
        "community":          comm_data,
        "nurse_stats":        nurse_stats,
        "recent":             recent,
        "red_flags":          red_flags,
        "all_records":        all_records,
        "diagnosis_options":  diagnosis_options,
        "red_flag_breakdown": red_flag_breakdown,
    }
