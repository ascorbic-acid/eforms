//Note: to make any field read only (for the client side) you just add the attribute "disabled" with the vale of "1"
// to the field element using js setAttribute an to set field to read and write just remove "disabled" attribute from the field element.

function set_props() {
    let status = document.querySelector('select[data-fieldname="status"]')
    console.log(status.value)
    // if save button clicked and its Completed then set status field as Read Only (Client Only)
    if(status.value =="Completed") {
		status.setAttribute("disabled", "1")
    }

}
function docSaveHandler(e) {
    let status = document.querySelector('select[data-fieldname="status"]')
    
    // if save button clicked and status is Completed then set status field Read Only (Client Only)
    if(status.value =="Completed") {
        status.setAttribute("disabled", "1")
    }
}
frappe.ready(function() {
    // bind events here

    // give some time for the web form fields to be loaded.
    setTimeout(set_props, 1000)

    // hook the upper save button
    document.getElementsByClassName("btn-primary")[0].addEventListener("click", function(event) {
        docSaveHandler(event)
    });
    // hook the buttom save button
    document.getElementsByClassName("btn-primary")[1].addEventListener("click", function(event) {
        docSaveHandler(event)
    });
})

