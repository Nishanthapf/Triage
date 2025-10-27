frappe.ui.form.on('Diabetes Followup', {
    refresh: function(frm) {
        // Apply custom style for checkboxes
        frm.$wrapper.find('[data-fieldname="check_jycp"] input[type="checkbox"]').css({
            "transform": "scale(1.5)",
            "accent-color": "#ff4d4d", // red
            "margin-right": "8px"
        });

        frm.$wrapper.find('[data-fieldname="check_fvvg"] input[type="checkbox"]').css({
            "transform": "scale(1.5)",
            "accent-color": "#4caf50", // green
            "margin-right": "8px"
        });

        frm.$wrapper.find('[data-fieldname="check_azac"] input[type="checkbox"]').css({
            "transform": "scale(1.5)",
            "accent-color": "#2196f3", // blue
            "margin-right": "8px"
        });

        frm.$wrapper.find('[data-fieldname="check_nbrf"] input[type="checkbox"]').css({
            "transform": "scale(1.5)",
            "accent-color": "#ff9800", // orange
            "margin-right": "8px"
        });
    }
});
