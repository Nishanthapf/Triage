import frappe
from frappe.utils import now_datetime

def create_dummy_data():
    try:
        doc = frappe.get_doc({
            "doctype": "Nurse Interventions",
            "patient_name": "Test Patient John",
            "age": 45,
            "gender": "Male",
            "date": now_datetime(),
            "temperature": 102.5, # High Fever Red Flag
            "pulse": 110,         # Abnormal Pulse Red Flag
            "blood_pressure_mmhg": "150/95", # High BP Red Flag
            "screening_for_diebetes": 1,
            "loose_stools_with_dehydration": 1, # Should trigger red flag if field exists
            "status": "Open"
        })
        doc.insert()
        print(f"Successfully created Dummy Record: {doc.name}")
        return doc.name
    except Exception as e:
        print(f"Error creating record: {str(e)}")

create_dummy_data()
