import frappe

@frappe.whitelist()
def get_seen(dt,dn):
    df = frappe.db.get_value(dt, dn, "meta_seen")
    return df
@frappe.whitelist()
def set_seen():
    df = frappe.db.set_value("eForm1", "EF001", "meta_seen", 1)
    return "set"