frappe.ui.form.on('Diabetes Followup', {
    refresh: function(frm) {
        console.log("Diabetes Followup client script loaded");
        // Evaluate red-flags and then sections visibility
        frm.trigger("toggle_screening_field");
        frm.trigger("toggle_sections");
    },

    // symptom / field change handlers (show red flag + re-evaluate screening field)
    loose_stools_with_dehydration: function(frm) { show_red_flag(frm, 'loose_stools_with_dehydration'); frm.trigger("toggle_screening_field"); },
    severe_vomiting:                 function(frm) { show_red_flag(frm, 'severe_vomiting');                 frm.trigger("toggle_screening_field"); },
    any_foul_smelling_ulcer:         function(frm) { show_red_flag(frm, 'any_foul_smelling_ulcer');         frm.trigger("toggle_screening_field"); },
    tooth_infection:                 function(frm) { show_red_flag(frm, 'tooth_infection');                 frm.trigger("toggle_screening_field"); },
    swelling_of_legs:               function(frm) { show_red_flag(frm, 'swelling_of_legs');               frm.trigger("toggle_screening_field"); },
    fever_with_dysuria:             function(frm) { show_red_flag(frm, 'fever_with_dysuria');             frm.trigger("toggle_screening_field"); },
    high_fever:                     function(frm) { show_red_flag(frm, 'high_fever');                     frm.trigger("toggle_screening_field"); },
    new_diabetic:                   function(frm) { show_red_flag(frm, 'new_diabetic');                   frm.trigger("toggle_screening_field"); },
    none:                           function(frm) { show_red_flag(frm, 'none');                           frm.trigger("toggle_screening_field"); },

    grbs:                           function(frm) { show_red_flag(frm, 'grbs');                           frm.trigger("toggle_screening_field"); },
    patient_drowsy:                 function(frm) { show_red_flag(frm, 'patient_drowsy');                 frm.trigger("toggle_screening_field"); },
    pulse_rate:                     function(frm) { show_red_flag(frm, 'pulse_rate');                     frm.trigger("toggle_screening_field"); },

    // when user chooses whether to continue, toggle the sections
    diabetes_followup: function(frm) {
        frm.trigger("toggle_sections");
    },

    // helper: decide whether to show the diabetes_followup field (based on all red-flag conditions)
    toggle_screening_field: function(frm) {
        // safe numeric parsing for grbs and pulse_rate
        const parseNumber = v => (v === undefined || v === null || v === '') ? null : (isNaN(Number(v)) ? null : Number(v));
        const grbsVal = frm.doc.grbs;
        const grbsNum = parseNumber(grbsVal);
        const grbsNotRecordable = (typeof grbsVal === "string" && /not\s*recordable/i.test(grbsVal));
        const grbsHigh = (grbsNum !== null) && (grbsNum > 300);

        const pulseNum = parseNumber(frm.doc.pulse_rate);
        const pulseAbnormal = (pulseNum !== null) && (pulseNum > 100 || pulseNum < 60);

        const patientDrowsyAndLow = frm.doc.patient_drowsy && (grbsNum !== null) && (grbsNum < 70);

        const show = !!(
            frm.doc.loose_stools_with_dehydration ||
            frm.doc.severe_vomiting ||
            frm.doc.any_foul_smelling_ulcer ||
            frm.doc.tooth_infection ||
            frm.doc.swelling_of_legs ||
            frm.doc.fever_with_dysuria ||
            frm.doc.high_fever ||
            frm.doc.new_diabetic ||
            frm.doc.none ||
            grbsHigh ||
            grbsNotRecordable ||
            patientDrowsyAndLow ||
            pulseAbnormal
        );

        // Toggle diabetes_followup (only if field exists)
        if (frm.fields_dict && frm.fields_dict.diabetes_followup) {
            frm.toggle_display("diabetes_followup", show);
        }

        if (show) {
            frm.set_df_property("diabetes_followup", "label", "Still want to continue with Clinical Template?");
            // Options must be a newline separated string for Select field, or array works in many versions — to be safe:
            try {
                frm.set_df_property("diabetes_followup", "options", "Yes\nNo");
            } catch (e) {
                // fallback if set_df_property with array fails in some versions
                frm.set_df_property("diabetes_followup", "options", ["Yes", "No"]);
            }
        } else {
            // clear any previous selection when not showing
            if (frm.doc.diabetes_followup) {
                frm.set_value("diabetes_followup", "");
            }
        }
    },

    // helper: show/hide the clinical sections depending on diabetes_followup === "Yes"
    toggle_sections: function(frm) {
        const show_sections = (frm.doc.diabetes_followup === "Yes");

        // list of fields/section-breaks and checkboxes you mentioned earlier
        const candidates = [
            "section_break_dkpy",
            "section_break_mowo",
            "section_break_qydn",
            "section_break_hiux",

            // some semantic names you referenced in your earlier script (safe to check)
            "personal_history",
            "diabetic_medicalhistory",
            "laboratory_test_section",

            // section completion checkboxes
            "check_jycp",
            "check_fvvg",
            "check_azac",
            "check_nbrf"
        ];

        // toggle only if the field exists (prevents JS errors)
        candidates.forEach(function(fieldname) {
            if (frm.fields_dict && frm.fields_dict[fieldname]) {
                frm.toggle_display(fieldname, show_sections);
            }
        });

        // when hiding sections, clear checkboxes so validate() won't block save unexpectedly
        if (!show_sections) {
            ["check_jycp","check_fvvg","check_azac","check_nbrf"].forEach(function(cb) {
                if (frm.fields_dict && frm.fields_dict[cb]) {
                    frm.set_value(cb, false);
                }
            });
        }
    },

    // validation before save: require section checks when continuing
    validate: function(frm) {
        if (frm.doc.diabetes_followup === "Yes") {
            if (!frm.doc.check_jycp) frappe.throw("⚠️ You didn’t complete Section Present Complaints");
            if (!frm.doc.check_fvvg) frappe.throw("⚠️ You didn’t complete Section Personal History");
            if (!frm.doc.check_azac) frappe.throw("⚠️ You didn’t complete Section Medical History");
            if (!frm.doc.check_nbrf) frappe.throw("⚠️ You didn’t complete Laboratory Test Section");
        }
    }
});

// Red flag message helper (keeps the same messages but with safe checks)
function show_red_flag(frm, fieldname) {
    const red_flags = {
        grbs: {
            refer: "Health center / PHC / CHC",
            message: "It could be non-compliance of medicine, a medicine dose has to be increased, or some underlying infection."
        },
        patient_drowsy: {
            refer: "Tertiary hospital",
            message: "Hypoglycemia is life-threatening and more difficult to treat than high sugar. If GRBS < 70 mg/dl, give one tablespoon of sugar, wait 15 minutes, and recheck. Repeat up to 3 times. Refer if still < 70 or patient is deteriorating."
        },
        pulse_rate: {
            refer: "Tertiary hospital",
            message: "Could be MI or another cardiac issue."
        },
        loose_stools_with_dehydration: {
            refer: "Health center / PHC / CHC",
            message: "Diabetic with dehydration can go into hypoglycemia soon."
        },
        severe_vomiting: {
            refer: "Health center / PHC / CHC",
            message: "Diabetic with dehydration can go into hypoglycemia soon."
        },
        any_foul_smelling_ulcer: {
            refer: "Health center / PHC / CHC",
            message: "Infection needs IV antibiotics, daily dressing, and continuous GRBS monitoring."
        },
        tooth_infection: {
            refer: "Health center / PHC / CHC",
            message: "Can lead to high blood sugar level."
        },
        swelling_of_legs: {
            refer: "Health center / PHC / CHC",
            message: "Could indicate kidney damage."
        },
        fever_with_dysuria: {
            refer: "Health center / PHC / CHC",
            message: "Urinary infection needs antibiotics."
        },
        high_fever: {
            refer: "Health center / PHC / CHC",
            message: "Requires lab test to determine cause."
        },
        new_diabetic: {
            refer: "Health center / PHC / CHC",
            message: "New diabetic, needs regular monitoring."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    // determine whether the condition is met (safe numeric parsing)
    const parseNumber = v => (v === undefined || v === null || v === '') ? null : (isNaN(Number(v)) ? null : Number(v));
    let condition_met = false;

    if (fieldname === "grbs") {
        const val = frm.doc.grbs;
        const num = parseNumber(val);
        const notRec = (typeof val === "string" && /not\s*recordable/i.test(val));
        condition_met = notRec || (num !== null && num > 300);
    } else if (fieldname === "patient_drowsy") {
        const grbsNum = parseNumber(frm.doc.grbs);
        condition_met = !!frm.doc.patient_drowsy && (grbsNum !== null && grbsNum < 70);
    } else if (fieldname === "pulse_rate") {
        const p = parseNumber(frm.doc.pulse_rate);
        condition_met = (p !== null && (p > 100 || p < 60));
    } else {
        condition_met = !!frm.doc[fieldname];
    }

    // show the message only when condition is true (and field exists in map)
    if (condition_met && red_flags[fieldname]) {
        const info = red_flags[fieldname];
        frappe.msgprint({
            title: "Red Flag Warning",
            message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
            indicator: "red"
        });
    }
}
