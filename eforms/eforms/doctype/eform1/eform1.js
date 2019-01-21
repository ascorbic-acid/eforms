// Copyright (c) 2019, ebkar and contributors
// For license information, please see license.txt

frappe.ui.form.on('eForm1', {
	refresh: function(frm) {
		let META_seen = document.querySelector('[data-fieldtype][data-fieldname="meta_seen"]');
		META_seen.style.visibility = "hidden";
	}
});
