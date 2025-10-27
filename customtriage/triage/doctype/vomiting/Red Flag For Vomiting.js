frappe.ui.form.on('Vomiting', {
    refresh(frm) {
        console.log("Script loaded");
        frm.toggle_display("red_flags_section", true); // Always visible
        frm.trigger("toggle_vomiting_field");
        frm.trigger("toggle_sections");
        frm.trigger("toggle_age_based_fields"); // Trigger age-based field visibility
    },

    // Symptom checkboxes → trigger red flags and vomiting field visibility
    dehydration(frm) { handle_red_flag(frm, 'dehydration'); },
    sever_dehydration(frm) { handle_red_flag(frm, 'sever_dehydration'); },
    none_vomiting_child(frm) { handle_red_flag(frm, 'none_vomiting_child'); },
    if_vomiting_with_mild_dehydration(frm) { handle_red_flag(frm, 'if_vomiting_with_mild_dehydration'); },
    if_vomiting_with_sever_dehydration_and_drowsiness(frm) { handle_red_flag(frm, 'if_vomiting_with_sever_dehydration_and_drowsiness'); },
    blood_in_the_vomit(frm) { handle_red_flag(frm, 'blood_in_the_vomit'); },
    none_vomiting(frm) { handle_red_flag(frm, 'none_vomiting'); },
    drowsy(frm) { 
        handle_red_flag(frm, 'if_vomiting_with_sever_dehydration_and_drowsiness'); 
        handle_red_flag(frm, 'sever_dehydration'); 
    },

    age(frm) {
        handle_red_flag(frm, 'if_vomiting_with_mild_dehydration');
        handle_red_flag(frm, 'if_vomiting_with_sever_dehydration_and_drowsiness');
        frm.trigger("toggle_age_based_fields"); // Trigger age-based field visibility on age change
    },

    vomiting(frm) {
        frm.trigger("toggle_sections");
    },

    toggle_vomiting_field(frm) {
        let show = (
            frm.doc.dehydration ||
            frm.doc.none_vomiting ||
            frm.doc.none_vomiting_child ||
            frm.doc.sever_dehydration ||
            frm.doc.if_vomiting_with_mild_dehydration ||
            frm.doc.if_vomiting_with_sever_dehydration_and_drowsiness ||
            frm.doc.drowsy ||
            frm.doc.blood_in_the_vomit
        ); // Excluded none_vomiting_child and none_vomiting

        frm.toggle_display("vomiting", show);

        if (show) {
            frm.set_df_property("vomiting", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("vomiting", "options", ["Yes", "No"]);
            frm.set_df_property("vomiting", true);
            frm.refresh_field("vomiting"); // Ensure dropdown renders correctly
        } else {
            frm.set_value("vomiting", "");
            frm.set_df_property("vomiting", false);
        }
    },

    toggle_sections(frm) {
        let show_sections = (frm.doc.vomiting === "Yes");

        // Section visibility
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_piry", show_sections);
        frm.toggle_display("section_break_ghle", show_sections);
        frm.toggle_display("section_break_cvvz", show_sections);

        // Section completion checkboxes
        frm.toggle_display("check_gycf", show_sections);
        frm.toggle_display("check_vdwf", show_sections);
        frm.toggle_display("check_mflx", show_sections);
        frm.toggle_display("check_auuw", show_sections);
    },

    toggle_age_based_fields(frm) {
        // Show 'test' if age < 5, else show 'column_break_ivhz'
        const age = frm.doc.age || 0;
        frm.toggle_display("test", age < 5);
        frm.toggle_display("column_break_ivhz", age >= 5);
    },

    validate(frm) {
        const checks = [
            { field: "check_gycf", label: "Physical Examination" },
            { field: "check_vdwf", label: "Personal and Lifestyle History" },
            { field: "check_mflx", label: "Present Complaints and Associated Complaints" },
            { field: "check_auuw", label: "Past History and Occupation History" }
        ];

        checks.forEach(item => {
            const checkboxWrapper = frm.fields_dict[item.field]?.$wrapper;
            if (!frm.doc[item.field]) {
                // Highlight unchecked checkbox wrapper
                if (checkboxWrapper && checkboxWrapper.length) {
                    checkboxWrapper.css({
                        'border': '2px solid red',
                        'padding': '5px',
                        'border-radius': '4px'
                    });
                }
                frappe.throw(`You didn't complete Section ${item.label}`);
            } else {
                // Reset style if checked
                if (checkboxWrapper && checkboxWrapper.length) {
                    checkboxWrapper.css({
                        'border': '',
                        'padding': '',
                        'border-radius': ''
                    });
                }
            }
        });
    }
});

// Helper: Show red flag only when checked
function handle_red_flag(frm, fieldname) {
    if (frm.doc[fieldname]) show_red_flag(frm, fieldname);
    frm.trigger("toggle_vomiting_field");
}

// Red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        dehydration: { refer: "Health centre/PHC/CHC", message: "Needs evaluation for dehydration." },
        sever_dehydration: { refer: frm.doc.drowsy ? "tertiary health care centre" : "Health centre/PHC/CHC", message: frm.doc.drowsy ? "Needs continuous IV fluids and monitoring." : "Severe dehydration requires evaluation." },
        none_vomiting_child: { refer: "No referral needed", message: "No critical symptoms detected for child." },
        none_vomiting: { refer: "No referral needed", message: "No critical symptoms detected for adult." },
        if_vomiting_with_mild_dehydration: { refer: "Health centre/PHC/CHC", message: "Needs IV fluids." },
        if_vomiting_with_sever_dehydration_and_drowsiness: { refer: "tertiary health care centre", message: "Needs continuous IV fluids and monitoring." },
        blood_in_the_vomit: { refer: "tertiary health care centre", message: "May be ulcer in the stomach or small intestine; in alcoholic could be oesophageal varices, both medical emergencies." }
    };

    const info = red_flags[fieldname];
    if (info && !["none_vomiting_child", "none_vomiting"].includes(fieldname)) {
        frappe.msgprint({
            title: "Red Flag Warning",
            message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
            indicator: "red"
        });
    }
}