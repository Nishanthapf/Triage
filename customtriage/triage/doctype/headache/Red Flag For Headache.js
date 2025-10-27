frappe.ui.form.on('Headache', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_headache_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_pdxh': '#FF5722',
                'check_zmlp': '#4CAF50',
                'check_yift': '#2196F3',
                'check_mrai': '#E91E63',
                'check_reps': '#9C27B0',
                'check_dwfp': '#26A69A',
                'check_vojh': '#FFC107'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control headache field visibility
    any_sudden_severe(frm) {
        show_red_flag(frm, 'any_sudden_severe');
        frm.trigger("toggle_headache_field");
    },
    headche_associated(frm) {
        show_red_flag(frm, 'headche_associated');
        frm.trigger("toggle_headache_field");
    },
    slurred_speech(frm) {
        show_red_flag(frm, 'slurred_speech');
        frm.trigger("toggle_headache_field");
    },
    headache_nasal(frm) {
        show_red_flag(frm, 'headache_nasal');
        frm.trigger("toggle_headache_field");
    },
    none_headache(frm) {
        show_red_flag(frm, 'none_headache');
        frm.trigger("toggle_headache_field");
    },

    // BP fields → trigger red flag check
    bp_systolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_headache_field");
    },
    bp_diastolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_headache_field");
    },

    // Headache select → controls section visibility
    headache(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show headache field if any red flag condition is met
    toggle_headache_field(frm) {
        let show = (
            frm.doc.any_sudden_severe ||
            frm.doc.headche_associated ||
            frm.doc.slurred_speech ||
            frm.doc.headache_nasal ||
            frm.doc.none_headache ||
            (frm.doc.bp_systolic > 180 || frm.doc.bp_diastolic > 120)
        );
        frm.toggle_display("headache", show);
        if (show) {
            frm.set_df_property("headache", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("headache", "options", ["Yes", "No"]);
        } else {
            frm.set_value("headache", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.headache === "Yes");
        frm.toggle_display("present_chief_complaints_section", show_sections);
        frm.toggle_display("section_break_orah", show_sections);
        frm.toggle_display("associted__symptoms_section", show_sections);
        frm.toggle_display("past_history_section", show_sections);
        frm.toggle_display("occupation_history_section", show_sections);
        frm.toggle_display("physical_examination_section", show_sections);
        frm.toggle_display("lab_test_section", show_sections);
        frm.toggle_display("check_pdxh", show_sections);
        frm.toggle_display("check_zmlp", show_sections);
        frm.toggle_display("check_yift", show_sections);
        frm.toggle_display("check_mrai", show_sections);
        frm.toggle_display("check_reps", show_sections);
        frm.toggle_display("check_dwfp", show_sections);
        frm.toggle_display("check_vojh", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("headache field value:", frm.doc.headache); // Debugging
        if (frm.doc.headache === "Yes") {
            console.log("check_pdxh:", frm.doc.check_pdxh); // Debugging
            console.log("check_zmlp:", frm.doc.check_zmlp); // Debugging
            console.log("check_yift:", frm.doc.check_yift); // Debugging
            console.log("check_mrai:", frm.doc.check_mrai); // Debugging
            console.log("check_reps:", frm.doc.check_reps); // Debugging
            console.log("check_dwfp:", frm.doc.check_dwfp); // Debugging
            console.log("check_vojh:", frm.doc.check_vojh); // Debugging
            if (!frm.doc.check_pdxh) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_zmlp) {
                frappe.throw("You didn’t complete Section 2");
            }
            if (!frm.doc.check_yift) {
                frappe.throw("You didn’t complete Associated Symptoms Section");
            }
            if (!frm.doc.check_mrai) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_reps) {
                frappe.throw("You didn’t complete Occupation History Section");
            }
            if (!frm.doc.check_dwfp) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
            if (!frm.doc.check_vojh) {
                frappe.throw("You didn’t complete Laboratory Test Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_pdxh': '#FF5722', // Deep Orange
        'check_zmlp': '#4CAF50', // Green
        'check_yift': '#2196F3', // Blue
        'check_mrai': '#E91E63', // Pink
        'check_reps': '#9C27B0', // Purple
        'check_dwfp': '#26A69A', // Teal
        'check_vojh': '#FFC107'  // Amber
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
        bp: {
            refer: "Tertiary health care centre",
            message: "Stroke or bleed."
        },
        any_sudden_severe: {
            refer: "Tertiary health care centre",
            message: "Stroke or bleed."
        },
        headche_associated: {
            refer: "Tertiary health care centre",
            message: "Stroke/bleed/malignancy/trauma."
        },
        slurred_speech: {
            refer: "Tertiary health care centre",
            message: "Stroke or bleed."
        },
        headache_nasal: {
            refer: "Tertiary health care centre",
            message: "Probably traumatic."
        },
        none_headache: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = false;
    if (fieldname === "bp" && (frm.doc.bp_systolic > 180 || frm.doc.bp_diastolic > 120)) {
        condition_met = true;
    } else if (frm.doc[fieldname]) {
        condition_met = true;
    }

    if (condition_met && fieldname !== "none_headache") {
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