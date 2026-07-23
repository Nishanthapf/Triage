// === Fatigue.js ===
frappe.ui.form.on('Fatigue', {
	refresh(frm) {
        if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }

        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }
    }
});

// === Check box for Fatigue.js ===
frappe.ui.form.on('Fatigue', {
    validate(frm) {
        if (!frm.doc.check_btjb ||
            !frm.doc.check_oxka ||
            !frm.doc.check_nzzr ||
            !frm.doc.check_hrsx ||
            !frm.doc.check_ixcj) {
            frappe.throw("You must select all checkboxes before saving.");
        }
    }
});
