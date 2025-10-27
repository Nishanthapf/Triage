frappe.ui.form.on('Nurse Interventions', {
    // When temperature field is changed
    temperature: function(frm) {
        if (frm.doc.temperature > 100) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Fever is more than 100 deg. F')
            });
        }
    },

    // When pulse field is changed
    pulse: function(frm) {
        let sweating = frm.doc.sweating ? ' with sweating' : '';
        if (frm.doc.pulse < 60) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Low pulse rate - less than 60 at rest' + sweating)
            });
        } else if (frm.doc.pulse > 100) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('High pulse rate - more than 100 at rest' + sweating)
            });
        }
    },

    // When saturation field is changed
    saturation: function(frm) {
        if (frm.doc.saturation < 90) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('SPo2 less than 90')
            });
        }
    },

    // When blood_pressure_mmhg field is changed
    blood_pressure_mmhg: function(frm) {
        if (frm.doc.blood_pressure_mmhg < 90) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Blood pressure low')
            });
        } else if (frm.doc.blood_pressure_mmhg > 140) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Blood pressure high')
            });
        }
    },

    // When rbg_level field is changed
    rbg_level: function(frm) {
        if (frm.doc.rbg_level > 200) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('RBS more than 200 mg/dl')
            });
        } else if (frm.doc.rbg_level < 70) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('RBS less than 70 mg/dl')
            });
        } else if (!frm.doc.rbg_level || frm.doc.rbg_level === '') {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('GRBS not recordable')
            });
        }
    }
});