import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebase.config';

import {ref, onUnmounted } from 'vue';

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const schedules = db.collection('schedules');


export const useLoadSchedules = () => {
    const cs = ref([])
    const close = schedules.onSnapshot(snapshot => {
        cs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    })
    onUnmounted(close);
    return cs;
}

export const getScheduleByCode = (id) => {
    const schedule = ref([])
    const close = schedules.doc(id).onSnapshot(doc => {
        schedule.value = doc.data();
    })
    onUnmounted(close);
    return schedule;
}

export const changeAnswer = async (ans) => {
    console.log("firebase:", ans);
    // TODO: Rethink whole logic
    // return schedules.doc(ans.id).users[1].update({maybe: ans.ans})

}