/* eslint-disable new-cap */
//import <%= Name %> from "../../../app/models/<%= name %>.js";
import {makeRequest} from "../common/request.js";

const <%= name %> = {
  "id": 1,
  "accountId": 1,
  "allowedLocations": "ar"
};

export default function <%= Name %>ShowSteps() {
  this.When(/^<%= name %> show request is received$/, function (callback) {
    //load query mocks
    this.database
      .mock
      .select("*")
      .from("<%= name %>s")
      .whereNull("deleted_at")
      .andWhere("id", 1)
      .limit(1)
      .results([<%= name %>]);
    //make request
    makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "get",
      () => {
        callback();
      });
  });

  this.When(/^<%= name %> show request is received but there is no <%= name %> found$/, function (callback) {
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
    makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "get",
      () => {
        callback();
      });
  });
}
