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
