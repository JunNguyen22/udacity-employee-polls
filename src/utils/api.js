import { _saveLikeToggle, _saveTweet } from "./_DATA_tweet.js";
import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveLikeToggle(info) {
  return _saveLikeToggle(info);
}

export function saveTweet(info) {
  return _saveTweet(info);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}
