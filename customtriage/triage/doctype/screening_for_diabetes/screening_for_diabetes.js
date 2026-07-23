// === Diabetes Screening.js ===
frappe.ui.form.on('Screening for Diabetes', {
    refresh(frm) {
        if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }

        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }
    }
});

// === Red Flags.js ===
frappe.ui.form.on('Screening for Diabetes', {
    refresh: function(frm) {
        // Add custom CSS for checkbox colors
        const custom_css = `
            /* Style for section_mydq_completed checkbox */
            input[name="section_mydq_completed"]:checked {
                accent-color: #4CAF50; /* Green */
            }
            /* Style for section_yjlm_completed checkbox */
            input[name="section_yjlm_completed"]:checked {
                accent-color: #2196F3; /* Blue */
            }
            /* Style for check_wtkw_completed checkbox */
            input[name="check_wtkw_completed"]:checked {
                accent-color: #FFC107; /* Amber */
            }
            /* Style for section_gtme_completed checkbox */
            input[name="section_gtme_completed"]:checked {
                accent-color: #E91E63; /* Pink */
            }
        `;
        // Inject the CSS into the form
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = custom_css;
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    // Trigger on change for all relevant checkboxes
    loose_stools_with_dehydration: function(frm) {
        show_red_flag(frm, 'loose_stools_with_dehydration');
    },
    severe_vomiting: function(frm) {
        show_red_flag(frm, 'severe_vomiting');
    },
    any_foul_smelling_ulcer: function(frm) {
        show_red_flag(frm, 'any_foul_smelling_ulcer');
    },
    tooth_infection: function(frm) {
        show_red_flag(frm, 'tooth_infection');
    },
    swelling_of_legs: function(frm) {
        show_red_flag(frm, 'swelling_of_legs');
    },
    fever_with_dysuria: function(frm) {
        show_red_flag(frm, 'fever_with_dysuria');
    },
    high_fever: function(frm) {
        show_red_flag(frm, 'high_fever');
    },
    check_hmpy: function(frm) {
        show_red_flag(frm, 'check_hmpy'); // New diabetic
    }
});

// Function to show the red flag message
function show_red_flag(frm, fieldname) {
    const red_flags = {
        'loose_stools_with_dehydration': {
            refer: 'Health center / PHC / CHC',
            message: 'Diabetic with dehydration can go into hypoglycemia soon.'
        },
        'severe_vomiting': {
            refer: 'Health center / PHC / CHC',
            message: 'Diabetic with dehydration can go into hypoglycemia soon.'
        },
        'any_foul_smelling_ulcer': {
            refer: 'Health center / PHC / CHC',
            message: 'Infection needs IV antibiotics, daily dressing, and continuous GRBS monitoring.'
        },
        'tooth_infection': {
            refer: 'Health center / PHC / CHC',
            message: 'Can lead to high blood sugar level.'
        },
        'swelling_of_legs': {
            refer: 'Health center / PHC / CHC',
            message: 'Could indicate kidney damage.'
        },
        'fever_with_dysuria': {
            refer: 'Health center / PHC / CHC',
            message: 'Urinary infection needs antibiotics.'
        },
        'high_fever': {
            refer: 'Health center / PHC / CHC',
            message: 'Requires lab test to determine cause.'
        },
        'check_hmpy': {
            refer: 'Health center / PHC / CHC',
            message: 'New diabetic, needs regular monitoring.'
        }
    };

    if (frm.doc[fieldname]) {
        let info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: __('🚩 Red Flag Warning'),
                message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
                indicator: 'red'
            });
        }
    }
}

// === Screening for Redflags.js ===
frappe.ui.form.on('Screening for Diabetes', {
    refresh(frm) {
        frm.trigger("toggle_screening_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → control screening_for_diabetes_form visibility
    loose_stools_with_dehydration(frm) { frm.trigger("toggle_screening_field"); },
    severe_vomiting(frm) { frm.trigger("toggle_screening_field"); },
    any_foul_smelling_ulcer(frm) { frm.trigger("toggle_screening_field"); },
    tooth_infection(frm) { frm.trigger("toggle_screening_field"); },
    swelling_of_legs(frm) { frm.trigger("toggle_screening_field"); },
    fever_with_dysuria(frm) { frm.trigger("toggle_screening_field"); },
    high_fever(frm) { frm.trigger("toggle_screening_field"); },
    check_hmpy(frm) { frm.trigger("toggle_screening_field"); },
    none(frm) { frm.trigger("toggle_screening_field"); },

    // Screening select → controls section visibility
    screening_for_diabetes_form(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show screening select if any symptom selected
    toggle_screening_field(frm) {
        let show = (
            frm.doc.loose_stools_with_dehydration ||
            frm.doc.severe_vomiting ||
            frm.doc.any_foul_smelling_ulcer ||
            frm.doc.tooth_infection ||
            frm.doc.swelling_of_legs ||
            frm.doc.fever_with_dysuria ||
            frm.doc.high_fever ||
            frm.doc.check_hmpy ||
            frm.doc.none
        );

        // show/hide field
        frm.toggle_display("screening_for_diabetes_form", show);

        // set label & options dynamically
        if (show) {
            frm.set_df_property("screening_for_diabetes_form", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("screening_for_diabetes_form", "options", ["Yes", "No"]);
        } else {
            frm.set_value("screening_for_diabetes_form", "");
        }
    },

    // Helper: Show sections only if "Yes" selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.screening_for_diabetes_form === "Yes");

        frm.toggle_display("section_break_mydq", show_sections);
        frm.toggle_display("section_break_yjlm", show_sections);
        frm.toggle_display("section_break_olkc", show_sections);
        frm.toggle_display("section_break_gtme", show_sections);
        frm.toggle_display("section_break_knrh", show_sections);

        // also show section completion checkboxes
        frm.toggle_display("section_mydq_completed", show_sections);
        frm.toggle_display("section_yjlm_completed", show_sections);
        frm.toggle_display("check_wtkw_completed", show_sections);
        frm.toggle_display("section_gtme_completed", show_sections);
        frm.toggle_display("lab_test_completed", show_sections);
    },

    // Validation before save → Ensure each section is marked completed if "Yes"
    validate(frm) {
        if (frm.doc.screening_for_diabetes_form === "Yes") {
            if (!frm.doc.section_mydq_completed) {
                frappe.throw("⚠️ You didn’t complete Section Present Chief Complaints");
            }
            if (!frm.doc.section_yjlm_completed) {
                frappe.throw("⚠️ You didn’t complete Section Associated Complaints.");
            }
            if (!frm.doc.check_wtkw_completed) {
                frappe.throw("⚠️ You didn’t complete Section Past History (Women).");
            }
            if (!frm.doc.section_gtme_completed) {
                frappe.throw("⚠️ You didn’t complete Section Personal and Physical Examination.");
            }
            if (!frm.doc.lab_test_completed) {
                frappe.throw("⚠️ You didn’t complete Lab Test Section.");
            }
        }
    }
});
