import Api from "./ApiService";

export default {
    getAppointments() {
        return Api().get("get-appointments");
    },

    markAsChecked(id) {
        return Api().put("doctor/appointments/mark-as-checked/" + id);
    },

    saveFeedback(id, data) {
        return Api().put("patient/appointments/feedback/" + id, data);
    },

    makeAppointment(data) {
        return Api().post("patient/appointments/store", data);
    }
};