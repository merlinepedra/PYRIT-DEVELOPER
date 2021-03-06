import {reactive} from 'vue'

const persistantState = reactive({
    activityDetection: true,
    audio: {id: null, name: ''},
    blackboardMode: false,
    chat: {
        active: true,
    },
    group: null,
    language: {id: 'en'},
    loading: true,
    localMute: false,
    password: '',
    permissions: {},
    present: '', // '', mike or 'both'
    request: {id: 'everything', name: 'Everything'},
    resolution: null,
    send: {id: 'normal', name: 'Normal'},
    title: '',
    username: '',
    video: {id: null, name: ''},
})

/**
 * State is always overwritten by these properties.
 */
const volatileState = {
    connected: false,
    devices: {
        audio: [],
        video: [],
    },
    mediaReady: false,
    messages: [],
    muted: false,
    notifications: [],
    permissions: {
        op: false,
        // Assume present permission before connecting,
        // so send can be modified in Settings.
        present: true,
        record: false,
    },
    streams: [],
    upMedia: {
        audio: [],
        local: [],
        screenshare: [],
        video: [],
    },
    users: [],
}

class Store {

    load() {
        let restoredState
        try {
            restoredState = JSON.parse(localStorage.getItem('store'))
        } catch (err) {
            restoredState = {}
        }

        Object.assign(persistantState, {...restoredState, ...volatileState})
        return persistantState
    }

    save() {
        localStorage.setItem('store', JSON.stringify(persistantState))
    }
}

export default Store
