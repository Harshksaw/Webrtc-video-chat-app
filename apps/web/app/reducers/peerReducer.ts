import { ADD_PEER, REMOVE_PEER } from "../actions/peerAction";

export type PeerState = Record<string, MediaStream>;


type PeerAction = {
    type: typeof ADD_PEER;
    payload: { peerId: string, stream: MediaStream };
} | {
    type: typeof REMOVE_PEER;
    payload: { peerId: string };
}



export const peerReducer = (state: PeerState, action: PeerAction): PeerState => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,

                [action.payload.peerId]: action.payload.stream

            }
        case REMOVE_PEER:
            const { [action.payload.peerId]: deleted, ...rest } = state;
            return rest;
        default:
            return { ...state };
    }
}