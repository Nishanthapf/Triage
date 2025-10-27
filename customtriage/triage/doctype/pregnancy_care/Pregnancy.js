frappe.ui.form.on('Pregnancy Care', {
	refresh(frm) {
	},
		lmp: function (frm) {
					frm.set_value("edd", frappe.datetime.add_days(frm.doc.lmp, 280));
		}
})

