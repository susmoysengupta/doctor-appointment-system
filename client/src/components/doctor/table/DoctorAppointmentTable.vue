<template>
	<!-- New Table -->
	<div class="w-full overflow-hidden rounded-lg shadow-xs">
		<div class="w-full overflow-x-auto">
			<table class="w-full whitespace-no-wrap">
				<thead>
					<tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
						<th class="px-4 py-3">Patient</th>
						<th class="px-4 py-3">Email</th>
						<th class="px-4 py-3">Phone no</th>
						<th class="px-4 py-3">Date & Time</th>
						<th class="px-4 py-3">Status</th>
						<th class="px-4 py-3">Completed at</th>
						<th class="px-4 py-3 flex items-center justify-center gap-1.5">
                            Action
                            <span v-if="isLoading">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
								</svg>
							</span>
                        </th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr
						class="text-gray-700 dark:text-gray-400"
						v-for="appointment in appointments"
						:key="appointment.id"
					>
						<td class="px-4 py-3">
							<div class="flex items-center text-sm">
								<div>
									<p class="font-semibold">
										{{ appointment.patient_name }}
									</p>
									<p class="text-xs text-gray-600 dark:text-gray-400">
										{{ genders[appointment.patient_gender - 1] }}
									</p>
								</div>
							</div>
						</td>
						<td class="px-4 py-3 text-sm">
							{{ appointment.patient_email }}
						</td>
						<td class="px-4 py-3 text-xs">
							{{ appointment.patient_phone_no ? appointment.patient_phone_no : "N/A" }}
						</td>
                        <td class="px-4 py-3 text-xs">
                            {{ moment(appointment.appointment_date).format('DD-MMM-YYYY')  }}
                            ,
							{{ moment(appointment.start_at, "hh:mm:ss").format('H:mm') }} 
                            -
                            {{ moment(appointment.end_at, "hh:mm:ss").format('H:mm') }}
						</td>
                        <td class="px-4 py-3 text-xs">
                            <span v-if="appointment.is_pending" class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:text-white dark:bg-yellow-600">
                                Pending
                            </span>
                            <span v-else class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                Completed
                            </span>
						</td>
                        <td class="px-4 py-3 text-xs text-center">
							{{appointment.checked_at ? moment(appointment.checked_at).format('DD-MMM-YYYY, H:mm') : 'N/A' }}
						</td>
						<td class="px-4 py-3 text-xs">
							<button
								type="button"
                                @click="markAsChecked(appointment.id)"
                                v-if="appointment.is_pending == 1 && moment(new Date()).diff(moment(appointment.appointment_date), 'days') == 0"
								class="
									px-3
									py-1
									text-xs
									font-medium
									leading-5
									text-white
									transition-colors
									duration-150
									bg-green-600
									border border-transparent
									rounded-md
									active:bg-green-600
									hover:bg-green-700
									focus:outline-none
									focus:shadow-outline-green
								"
							>
								Mark as completed
							</button>
                            <span v-else-if="appointment.is_pending != 1 && appointment.checked_at != NULL" class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                                Marked as completed
                            </span>
						</td>
					</tr>
				</tbody>
			</table>
            <p v-if="appointments.length == 0" class="mt-4 text-gray-700 dark:text-gray-400 text-center">You have no appointments</p>
		</div>
	</div>
</template>
<script> 
import AppointmentService from "../../../services/AppointmentService";
import { ref, computed } from "vue";
import moment from 'moment';

export default {
	async setup() {
		const response = ref(await AppointmentService.getAppointments());
		const appointments = computed(() => response.value.data.data);
		const isLoading = ref(false);
        const genders = ['Male', 'Female', 'Other'];

        function markAsChecked(id) {
			if (confirm("Are you sure?")) {
				isLoading.value = true;
				AppointmentService.markAsChecked(id)
					.then(() => {
						AppointmentService.getAppointments().then((markAsCheckedResponse) => {
							response.value = markAsCheckedResponse;
							isLoading.value = false;
						});
					})
					.catch(() => alert("Something went wrong!!!"));
			}
		}

		return {
			appointments,
			isLoading,
            genders,
            markAsChecked,
            moment
		};
	},
};
</script>