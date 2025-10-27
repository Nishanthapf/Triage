frappe.ui.form.on('Skin Problem', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_skin_problem_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_cbvu': '#FF5722',
                'check_hgfb': '#4CAF50'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control skin_problem field visibility
    any_painful_skin_rash_with_blisters_or_open_sores(frm) {
        show_red_flag(frm, 'any_painful_skin_rash_with_blisters_or_open_sores');
        frm.trigger("toggle_skin_problem_field");
    },
    any_yellow_or_bloody_discharge(frm) {
        show_red_flag(frm, 'any_yellow_or_bloody_discharge');
        frm.trigger("toggle_skin_problem_field");
    },
    any_rash_which_is_extensive_on_the_body(frm) {
        show_red_flag(frm, 'any_rash_which_is_extensive_on_the_body');
        frm.trigger("toggle_skin_problem_field");
    },
    sudden_oset(frm) {
        show_red_flag(frm, 'sudden_oset');
        frm.trigger("toggle_skin_problem_field");
    },
    none_skin(frm) {
        show_red_flag(frm, 'none_skin');
        frm.trigger("toggle_skin_problem_field");
    },

    // Skin problem select → controls section visibility
    skin_problem(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show skin_problem field if any red flag condition is met
    toggle_skin_problem_field(frm) {
        let show = (
            frm.doc.any_painful_skin_rash_with_blisters_or_open_sores ||
            frm.doc.any_yellow_or_bloody_discharge ||
            frm.doc.any_rash_which_is_extensive_on_the_body ||
            frm.doc.sudden_oset ||
            frm.doc.none_skin
        );
        frm.toggle_display("skin_problem", show);
        if (show) {
            frm.set_df_property("skin_problem", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("skin_problem", "options", ["Yes", "No"]);
        } else {
            frm.set_value("skin_problem", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.skin_problem === "Yes");
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("check_cbvu", show_sections);
        frm.toggle_display("check_hgfb", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("skin_problem field value:", frm.doc.skin_problem); // Debugging
        if (frm.doc.skin_problem === "Yes") {
            console.log("check_cbvu:", frm.doc.check_cbvu); // Debugging
            console.log("check_hgfb:", frm.doc.check_hgfb); // Debugging
            if (!frm.doc.check_cbvu) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_hgfb) {
                frappe.throw("You didn’t complete Occupational History Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_cbvu': '#FF5722', // Deep Orange
        'check_hgfb': '#4CAF50'  // Green
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
        any_painful_skin_rash_with_blisters_or_open_sores: {
            refer: "Health centre/PHC/CHC",
            message: "Infective skin disorder."
        },
        any_yellow_or_bloody_discharge: {
            refer: "Health centre/PHC/CHC",
            message: "Infective skin disorder."
        },
        any_rash_which_is_extensive_on_the_body: {
            refer: "Health centre/PHC/CHC",
            message: "Infective skin disorder."
        },
        sudden_oset: {
            refer: "Tertiary health care centre",
            message: "Life threatening could be due to severe drug reaction or infection."
        },
        none_skin: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_skin") {
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