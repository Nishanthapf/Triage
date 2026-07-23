import frappe


def boot_session(bootinfo):
	if "Nurse" in frappe.get_roles(frappe.session.user):
		bootinfo.home_page = "triage-dashboard"
