frappe.ui.form.on('Thyroid Problem', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_thyroid_problem_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_pwoq': '#FF5722',
                'check_uhyw': '#4CAF50'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control thyroid_problem field visibility
    based_on_labreport(frm) {
        show_red_flag(frm, 'based_on_labreport');
        frm.trigger("toggle_thyroid_problem_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_thyroid_problem_field");
    },

    // Thyroid problem select → controls section visibility
    thyroid_problem(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show thyroid_problem field if any red flag condition is met
    toggle_thyroid_problem_field(frm) {
        let show = (
            frm.doc.based_on_labreport ||
            frm.doc.none
        );
        frm.toggle_display("thyroid_problem", show);
        if (show) {
            frm.set_df_property("thyroid_problem", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("thyroid_problem", "options", ["Yes", "No"]);
        } else {
            frm.set_value("thyroid_problem", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.thyroid_problem === "Yes");
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("check_pwoq", show_sections);
        frm.toggle_display("check_uhyw", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("thyroid_problem field value:", frm.doc.thyroid_problem); // Debugging
        if (frm.doc.thyroid_problem === "Yes") {
            console.log("check_pwoq:", frm.doc.check_pwoq); // Debugging
            console.log("check_uhyw:", frm.doc.check_uhyw); // Debugging
            if (!frm.doc.check_pwoq) {
                frappe.throw("You didn’t complete Section 1");
            }
            if (!frm.doc.check_uhyw) {
                frappe.throw("You didn’t complete Past History Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_pwoq': '#FF5722', // Deep Orange
        'check_uhyw': '#4CAF50'  // Green
    };

    Object.keys(checkboxColors).forEach(fieldname => {
        if (!frm.fields_dict[fieldname]) {
            console.warn(`Field ${fieldname} not found in form`);
            return;
        }
        const checkbox = frm.fields_dict[fieldname].$wrapper.find('input[type="checkbox"]');
        if (checkbox && checkbox.length > 0) {
            console.log(`Found checkbox for ${fieldname}`);
            checkbox.removeAttr('style');
            const wrapper = checkbox.parent();
            wrapper.css({
                'display': 'inline-flex',
                'align-items': 'center'
            });
            checkbox.css({
                'appearance': 'none',
                'width': '16px',
                'height': '16px',
                'border': '2px solid #ccc',
                'border-radius': '4px',
                'margin-right': '5px',
                'cursor': 'pointer',
                'background-color': checkbox.is(':checked') ? checkboxColors[fieldname] : '#fff',
                'transition': 'background-color 0.3s'
            });
            checkbox.off('change').on('change', function() {
                $(this).css('background-color', this.checked ? checkboxColors[fieldname] : '#fff');
                $(this).next('label').css('color', this.checked ? checkboxColors[fieldname] : '');
            });
            checkbox.trigger('change');
        } else {
            console.log(`Checkbox not found for ${fieldname}`);
        }
    });
}

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        based_on_labreport: {
            refer: "Health centre/PHC/CHC",
            message: "TSH level is more or less than normal (based on the lab report)."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none") {
        let info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: "Red Flag Warning",
                message: "Refer to: " + info.refer + "<br>Note: " + info.message,
                indicator: "red"
            });
        }
    }
}