frappe.ui.form.on('Lymph node Enlargement', {
    refresh(frm) {
        console.log("Script loaded");
        frm.toggle_display("red_flags_section", true);
        frm.trigger("toggle_lymph_node_enlargement_field");
        frm.trigger("toggle_sections");

        // Apply checkbox colors after DOM render
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Checkbox colors applied");
        }, 300);
    },

    // Symptom checkboxes
    any_painful_lymphnode(frm) {
        show_red_flag(frm, 'any_painful_lymphnode');
        frm.trigger("toggle_lymph_node_enlargement_field");
    },
    none_lymph(frm) {
        show_red_flag(frm, 'none_lymph');
        frm.trigger("toggle_lymph_node_enlargement_field");
    },

    // Lymph node enlargement select → controls section visibility
    lymph_node_enlargement(frm) {
        frm.trigger("toggle_sections");
    },

    // Toggle lymph_node_enlargement field visibility
    toggle_lymph_node_enlargement_field(frm) {
        let show = (frm.doc.any_painful_lymphnode || frm.doc.none_lymph);

        frm.toggle_display("lymph_node_enlargement", show);

        if (show) {
            frm.set_df_property("lymph_node_enlargement", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("lymph_node_enlargement", "options", ["Yes", "No"]);
        } else {
            frm.set_value("lymph_node_enlargement", "");
        }
    },

    // Show/hide sections based on lymph_node_enlargement value
    toggle_sections(frm) {
        let show_sections = (frm.doc.lymph_node_enlargement === "Yes");

        // Toggle visibility of sections
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("section_break_zpmq", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("section_break_xelj", show_sections);

        // Corrected checkbox order:
        const checkbox_fields = ["check_baks", "check_fdcu", "check_rkua", "check_lyvk"];
        checkbox_fields.forEach(field => frm.toggle_display(field, show_sections));

        // Reapply colors after toggle
        setTimeout(() => applyCheckboxColors(frm), 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered");

        // ✅ Removed naming_series to avoid “field not found” error

        if (frm.doc.lymph_node_enlargement === "Yes") {
            if (!frm.doc.check_baks) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_fdcu) {
                frappe.throw("You didn’t complete Any Associated Symptoms Section");
            }
            if (!frm.doc.check_rkua) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_lyvk) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
        }
    }
});

// Apply colors to checkbox fields with alignment
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_baks': '#FF5722', // Deep Orange - Chief Complaints
        'check_fdcu': '#9C27B0', // Purple - Associated Symptoms
        'check_rkua': '#4CAF50', // Green - Past History
        'check_lyvk': '#2196F3'  // Blue - Physical Examination
    };

    Object.keys(checkboxColors).forEach(fieldname => {
        if (!frm.fields_dict[fieldname]) return;

        const checkbox = frm.fields_dict[fieldname].$wrapper.find('input[type="checkbox"]');
        if (checkbox.length > 0) {
            const color = checkboxColors[fieldname];
            checkbox.removeAttr('style');

            const wrapper = checkbox.parent();
            wrapper.css({
                display: 'inline-flex',
                alignItems: 'center',
                marginRight: '20px'
            });

            checkbox.css({
                appearance: 'none',
                width: '16px',
                height: '16px',
                border: '2px solid #ccc',
                borderRadius: '4px',
                marginRight: '5px',
                cursor: 'pointer',
                backgroundColor: checkbox.is(':checked') ? color : '#fff',
                transition: 'background-color 0.3s'
            });

            checkbox.off('change').on('change', function() {
                $(this).css('background-color', this.checked ? color : '#fff');
                $(this).next('label').css('color', this.checked ? color : '');
            });

            checkbox.trigger('change');
        }
    });
}

// Red flag display
function show_red_flag(frm, fieldname) {
    const red_flags = {
        any_painful_lymphnode: {
            refer: "Health centre/PHC/CHC",
            message: "Could be due to local infections."
        }
    };

    const info = red_flags[fieldname];
    if (frm.doc[fieldname] && info) {
        frappe.msgprint({
            title: "Red Flag Warning",
            message: "Refer to: " + info.refer + "<br>Note: " + info.message,
            indicator: "red"
        });
    }
}
