frappe.ui.form.on('Diarrhea', {
    refresh(frm) {
        console.log("Script loaded and refresh triggered");
        frm.toggle_display("red_flags_section", true);

        // Hide both sections initially
        frm.toggle_display("column_break_rlgl", false);
        frm.toggle_display("column_break_lecg", false);

        frm.trigger("toggle_age_fields");
        frm.trigger("toggle_diarrhea_field");
        frm.trigger("toggle_sections");
        console.log("Initial age:", frm.doc.age || "unset");
    },

    age(frm) {
        frm.trigger("toggle_age_fields");
        frm.trigger("toggle_diarrhea_field");
        console.log("Age changed to:", frm.doc.age);
    },

    // -------------------- CHILD RED FLAGS (AGE <= 5) --------------------
    severly_dehydrated(frm) { 
        if (frm.doc.severly_dehydrated) frm.set_value('none_child', 0);
        handle_red_flag(frm, 'severly_dehydrated'); 
    },
    any_child_with_diarrhoea(frm) { 
        if (frm.doc.any_child_with_diarrhoea) frm.set_value('none_child', 0);
        handle_red_flag(frm, 'any_child_with_diarrhoea'); 
    },
    fever_with_diarrhoea(frm) { 
        if (frm.doc.fever_with_diarrhoea) frm.set_value('none_child', 0);
        handle_red_flag(frm, 'fever_with_diarrhoea'); 
    },
    none_child(frm) {
        if (frm.doc.none_child) {
            const childFields = ['severly_dehydrated', 'any_child_with_diarrhoea', 'fever_with_diarrhoea'];
            childFields.forEach(field => frm.set_value(field, 0));
        }
        handle_red_flag(frm, 'none_child');
    },

    // -------------------- ADULT RED FLAGS (AGE > 5) --------------------
    severe_dehydration(frm) { 
        if (frm.doc.severe_dehydration) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'severe_dehydration'); 
    },
    diarrhoea_vomiting(frm) { 
        if (frm.doc.diarrhoea_vomiting) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'diarrhoea_vomiting'); 
    },
    blood_in_stools(frm) { 
        if (frm.doc.blood_in_stools) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'blood_in_stools'); 
    },
    foul_smelling_diarrhoea(frm) { 
        if (frm.doc.foul_smelling_diarrhoea) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'foul_smelling_diarrhoea'); 
    },
    severe_abdominal_pain_with_diarrhoea(frm) { 
        if (frm.doc.severe_abdominal_pain_with_diarrhoea) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'severe_abdominal_pain_with_diarrhoea'); 
    },
    feeding_better_ors(frm) { 
        if (frm.doc.feeding_better_ors) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'feeding_better_ors'); 
    },
    diarrhoea_fever(frm) { 
        if (frm.doc.diarrhoea_fever) frm.set_value('none_diarrhea', 0);
        handle_red_flag(frm, 'diarrhoea_fever'); 
    },
    none_diarrhea(frm) {
        if (frm.doc.none_diarrhea) {
            const adultFields = ['severe_dehydration', 'diarrhoea_vomiting', 'blood_in_stools', 
                                'foul_smelling_diarrhoea', 'severe_abdominal_pain_with_diarrhoea', 
                                'feeding_better_ors', 'diarrhoea_fever'];
            adultFields.forEach(field => frm.set_value(field, 0));
        }
        handle_red_flag(frm, 'none_diarrhea');
    },

    drowsy(frm) {
        const age = frm.doc.age || 0;
        if (frm.doc.drowsy) {
            if (age <= 5 && frm.doc.severly_dehydrated) show_red_flag(frm, 'severly_dehydrated');
            if (age > 5 && frm.doc.severe_dehydration) show_red_flag(frm, 'severe_dehydration');
        }
        frm.trigger("toggle_diarrhea_field");
    },

    diarrhea(frm) { 
        frm.trigger("toggle_sections"); 
    },

    // -------------------- TOGGLE AGE FIELDS --------------------
    toggle_age_fields(frm) {
        const age = frm.doc.age;

        const childFields = ['child', 'severly_dehydrated', 'any_child_with_diarrhoea', 
                            'fever_with_diarrhoea', 'none_child'];
        const adultFields = ['adult', 'severe_dehydration', 'diarrhoea_vomiting', 'blood_in_stools', 
                            'foul_smelling_diarrhoea', 'severe_abdominal_pain_with_diarrhoea', 
                            'feeding_better_ors', 'diarrhoea_fever', 'none_diarrhea'];

        // Always hide both first
        frm.toggle_display("column_break_rlgl", false);
        frm.toggle_display("column_break_lecg", false);
        childFields.forEach(f => frm.toggle_display(f, false));
        adultFields.forEach(f => frm.toggle_display(f, false));

        // Show based on valid age
        if (age || age === 0) {
            if (age <= 5) {
                frm.toggle_display("column_break_rlgl", true);
                childFields.forEach(field => frm.toggle_display(field, true));
            } else {
                frm.toggle_display("column_break_lecg", true);
                adultFields.forEach(field => frm.toggle_display(field, true));
            }
        }
    },

    // -------------------- TOGGLE DIARRHEA FIELD --------------------
    toggle_diarrhea_field(frm) {
        const age = frm.doc.age || 0;
        const child_red_flags = ['severly_dehydrated', 'any_child_with_diarrhoea', 'fever_with_diarrhoea'];
        const adult_red_flags = ['severe_dehydration', 'diarrhoea_vomiting', 'blood_in_stools', 
                                'foul_smelling_diarrhoea', 'severe_abdominal_pain_with_diarrhoea', 
                                'feeding_better_ors', 'diarrhoea_fever'];

        let show = false;
        if (age <= 5) {
            show = child_red_flags.some(f => frm.doc[f]) || frm.doc.none_child;
        } else {
            show = adult_red_flags.some(f => frm.doc[f]) || frm.doc.none_diarrhea;
        }

        frm.toggle_display("diarrhea", show);

        if (show) {
            frm.set_df_property("diarrhea", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("diarrhea", "options", ["Yes", "No"]);
            frm.set_df_property("diarrhea", "reqd", true);
            frm.refresh_field("diarrhea");
        } else {
            frm.set_value("diarrhea", "");
            frm.set_df_property("diarrhea", "reqd", false);
        }
    },

    // -------------------- TOGGLE FOLLOW-UP SECTIONS --------------------
    toggle_sections(frm) {
        let show_sections = (frm.doc.diarrhea === "Yes");
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_tzom", show_sections);
        frm.toggle_display("check_zpwe", show_sections);
        frm.toggle_display("check_jspw", show_sections);
    },

    // -------------------- VALIDATION --------------------
    validate(frm) {
        if (frm.doc.diarrhea === "Yes") {
            if (!frm.doc.check_zpwe) frappe.throw("⚠️ You didn't complete Section Present Complaints");
            if (!frm.doc.check_jspw) frappe.throw("⚠️ You didn't complete Section Physical Examination");
        }
    }
});

// -------------------- HELPER FUNCTIONS --------------------
function handle_red_flag(frm, fieldname) {
    const age = frm.doc.age || 0;
    const childFields = ['severly_dehydrated', 'any_child_with_diarrhoea', 'fever_with_diarrhoea', 'none_child'];
    const adultFields = ['severe_dehydration', 'diarrhoea_vomiting', 'blood_in_stools', 
                        'foul_smelling_diarrhoea', 'severe_abdominal_pain_with_diarrhoea', 
                        'feeding_better_ors', 'diarrhoea_fever', 'none_diarrhea'];
    
    if (frm.doc[fieldname]) {
        if ((age <= 5 && childFields.includes(fieldname)) || (age > 5 && adultFields.includes(fieldname))) {
            show_red_flag(frm, fieldname);
        }
    }
    frm.trigger("toggle_diarrhea_field");
}

function show_red_flag(frm, fieldname) {
    const red_flags = {
        // Child red flags
        severly_dehydrated: { refer: frm.doc.drowsy ? "Tertiary health care centre" : "Health centre/PHC/CHC", message: frm.doc.drowsy ? "Could be life threatening" : "Severe dehydration in child requires urgent evaluation." },
        any_child_with_diarrhoea: { refer: "Health centre/PHC/CHC", message: "Need further assessment." },
        fever_with_diarrhoea: { refer: "Health centre/PHC/CHC", message: "Need further assessment." },
        // none_child: { refer: "No referral needed", message: "No critical symptoms detected." },

        // Adult red flags
        severe_dehydration: { refer: frm.doc.drowsy ? "Tertiary health care centre" : "Health centre/PHC/CHC", message: frm.doc.drowsy ? "Could be life threatening" : "Severe dehydration in adult requires urgent evaluation." },
        diarrhoea_vomiting: { refer: "Health centre/PHC/CHC", message: "Required IV infusion." },
        blood_in_stools: { refer: "Health centre/PHC/CHC", message: "Need antibiotics/ could be bacterial infection or food poisoning." },
        foul_smelling_diarrhoea: { refer: "Health centre/PHC/CHC", message: "Infective diarrhoea." },
        severe_abdominal_pain_with_diarrhoea: { refer: "Health centre/PHC/CHC", message: "Need antibiotics/ could be bacterial infection or food poisoning." },
        feeding_better_ors: { refer: "Health centre/PHC/CHC", message: "Need antibiotics." },
        diarrhoea_fever: { refer: "Health centre/PHC/CHC", message: "Need further assessment." }
        // none_diarrhea: { refer: "No referral needed", message: "No critical symptoms detected." }
    };

    if (red_flags[fieldname]) {
        frappe.msgprint({
            title: "Red Flag Warning",
            message: `<b>Refer to:</b> ${red_flags[fieldname].refer}<br><b>Note:</b> ${red_flags[fieldname].message}`,
            indicator: "red"
        });
    }
}
