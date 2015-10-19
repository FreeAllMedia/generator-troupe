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

export default function <%= Name %>UpdateSteps() {
  this.When(/^<%= name %> delete request is received$/, function (callback) {
    //load query mocks
    this.database
      .mock
      .select("*")
      .from("<%= name %>s")
      .whereNull("deleted_at")
      .andWhere("id", 1)
      .limit(1)
      .results([<%= name %>]);

    this.database
      .mock
      .update({
        "account_id": 1,
        "allowed_locations": "ar",
        "deleted_at": dateRegex,
        "is_sandbox": true,
        "name": "test <%= name %>",
        "permalink": "some permalink",
        "updated_at": dateRegex
      })
      .into("<%= name %>s")
      .where("id", 1)
      .results(1);
    //make request
    this.body = {data: <%= name %>};
    makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "delete",
      () => {
        callback();
      });
  });

  this.When(/^an invalid <%= name %> delete request is received$/, function (callback) {
    //prepare request body
    this.body = {data: <%= name %>};
    //load query mocks
    this.database
      .mock
      .select("*")
      .from("<%= name %>s")
      .whereNull("deleted_at")
      .andWhere("id", 1)
      .limit(1)
      .results([]);
    //make request
    makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "delete",
      () => {
        callback();
      });
  });
}
