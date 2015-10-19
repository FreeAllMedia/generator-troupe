/* eslint-disable new-cap */
//import <%= Name %> from "../../../app/models/<%= name %>.js";
import {makeRequest} from "../common/request.js";
import {dateRegex} from "../common/values.js";

const <%= name %> = {
  "id": 1,
  "accountId": 1,
  "name": "test <%= name %>",
  "permalink": "some permalink",
  "allowedLocations": "ar"
};

const invalid<%= Name %> = {
  "id": 1,
  "accountId": 1
};

export default function <%= Name %>CreateSteps() {
  this.When(/^<%= name %> create request is received$/, function (callback) {
    //load query mocks
    this.database
      .mock
      .insert({
        "account_id": <%= name %>.accountId,
        "allowed_locations": <%= name %>.allowedLocations,
        "created_at": dateRegex,
        "is_sandbox": true,
        "name": <%= name %>.name,
        "permalink": <%= name %>.permalink
      })
      .into("<%= name %>s")
      .results(1);
    //make request
    this.body = {data: <%= name %>};
    makeRequest.call(this, "/<%= name %>", "post",
      () => {
        callback();
      });
  });

  this.When(/^an invalid <%= name %> create request is received$/, function (callback) {
    //prepare request body
    this.body = {data: invalid<%= Name %>};
    //make request
    makeRequest.call(this, "/<%= name %>", "post",
      () => {
        callback();
      });
  });
}
