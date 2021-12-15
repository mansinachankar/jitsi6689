// @flow
import type { Dispatch } from "redux";
import axios from "axios";

import { openDialog } from "../base/dialog";

import { CANCEL_FEEDBACK } from "./actionTypes";
import { FeedbackDialog } from "./components";

/**
 * Caches the passed in feedback in the redux store.
 *
 * @param {number} score - The Audio quality score given to the conference.
 * @param {number} score2 - The video quality score given to the conference.
 * @param {string} message - A description entered by the participant that
 * explains the rating.
 * @returns {{
 *     type: CANCEL_FEEDBACK,
 *     message: string,
 *     score: number
 * }}
 */
export function cancelFeedback(score, score2, message) {
    return {
        type: CANCEL_FEEDBACK,
        message,
        score,
        score2,
    };
}

/**
 * Opens {@code FeedbackDialog}.
 *
 * @param {Function} [onClose] - An optional callback to invoke when the dialog
 * is closed.
 * @returns {Object}
 */
export function openFeedbacksDialog(onClose: ?Function) {
    return openDialog(FeedbackDialog, {
        onClose,
    });
}

/**
 * Send the passed in feedback.
 *
 * @param {number} score - An integer between 1 and 5 indicating the user
 * feedback. The negative integer -1 is used to denote no score was selected.
 * @param {number} score2 - An integer between 1 and 5 indicating the user
 * feedback. The negative integer -1 is used to denote no score was selected.
 * @param {string} message - Detailed feedback from the user to explain the
 * rating.
 * @returns {Function}
 */
export function submitFeedback(score, score2, message) {
    var username = "Anonymous User";
    var splitURL = window.location.href.split("/");
    var meetingName = splitURL[3];

    var url = "https://sangoshthee.cdac.in/feedbackApi/";

    if (!url) {
        return undefined;
    }
    return axios
        .post(url, {
            user_name: username,
            ratings: score,
            video_rating: score2,
            message: message,
            conference_name: meetingName,
        })
        .then((response) => {
            if ((response.data.status = "1")) {
                console.log(response.data.msg);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
