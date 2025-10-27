frappe.ui.form.on('Chest Pain', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_chest_pain_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_mhdx': '#FF5722',
                'check_rehf': '#4CAF50',
                'check_uoln': '#2196F3'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes
    sudden_onset_chest_pain(frm) {
        show_red_flag(frm, 'sudden_onset_chest_pain');
        frm.trigger("toggle_chest_pain_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_chest_pain_field");
    },

    // Chest pain select
    chest_pain(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show chest_pain field if any red flag condition is met
    toggle_chest_pain_field(frm) {
        let show = (
            frm.doc.sudden_onset_chest_pain ||
            frm.doc.none
        );
        frm.toggle_display("chest_pain", show);
        if (show) {
            frm.set_df_property("chest_pain", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("chest_pain", "options", ["Yes", "No"]);
        } else {
            frm.set_value("chest_pain", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.chest_pain === "Yes");
        frm.toggle_display("section_break_idcr", show_sections);
        frm.toggle_display("section_break_txld", show_sections);
        frm.toggle_display("section_break_uivk", show_sections);
        frm.toggle_display("check_mhdx", show_sections);
        frm.toggle_display("check_rehf", show_sections);
        frm.toggle_display("check_uoln", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("chest_pain field value:", frm.doc.chest_pain); // Debugging
        if (frm.doc.chest_pain === "Yes") {
            console.log("check_mhdx:", frm.doc.check_mhdx); // Debugging
            console.log("check_rehf:", frm.doc.check_rehf); // Debugging
            console.log("check_uoln:", frm.doc.check_uoln); // Debugging
            if (!frm.doc.check_mhdx) {
                frappe.throw("You didn’t complete Section 1");
            }
            if (!frm.doc.check_rehf) {
                frappe.throw("You didn’t complete Section 2");
            }
            if (!frm.doc.check_uoln) {
                frappe.throw("You didn’t complete Past History Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_mhdx': '#FF5722', // Deep Orange
        'check_rehf': '#4CAF50', // Green
        'check_uoln': '#2196F3'  // Blue
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
        sudden_onset_chest_pain: {
            refer: "Tertiary health care center",
            message: "Could be MI (Myocardial Infarction)."
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