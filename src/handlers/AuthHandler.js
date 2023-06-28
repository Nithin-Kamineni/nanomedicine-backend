"use strict";
const UserDbAccessordbAccessor = require("../dbAccessor/UserDbAccessor");
const userDbAccessordbAccessor = new UserDbAccessordbAccessor();

module.exports.GetUserDetails = async (options) =>{
    // options have parameters of get request
    let dataRecords = await userDbAccessordbAccessor.filterAndSelect(options);
    // removing unwanted columns from dataRecords
    let responsedata = {"username":dataRecords[0].username, "email":dataRecords[0].email, "image":dataRecords[0].picture, "company":dataRecords[0].company, "country":dataRecords[0].country, "phone":dataRecords[0].phone_number, "linkedin_url":dataRecords[0].linkedin_url, "role":dataRecords[0].role}
    return responsedata;
};

module.exports.UpdateUserDetails = async (options) =>{
    // options have parameters of get request
    let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
    let filteringRecord = filteringRecords[0];
    for (let key in options) {
            filteringRecord[key] = options[key];
      }
      console.log(filteringRecord);
    let dataRecords = await userDbAccessordbAccessor.update(filteringRecord);
    // removing unwanted columns from dataRecords
    // let responsedata = {"username":dataRecords.username, "email":dataRecords.email  }
    let responsedata = dataRecords;

    return responsedata;
};

// module.exports.UpdateUserPicture = async (options) =>{
//     // options have parameters of get request
//     let filteringRecord = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
//     for (let key in options) {
//             filteringRecord[key] = options[key];
//       }

//     let dataRecords = await userDbAccessordbAccessor.update(filteringRecord);
//     // removing unwanted columns from dataRecords
//     // let responsedata = {"username":dataRecords.username, "email":dataRecords.email  }
//     let responsedata = dataRecords;

//     return responsedata;
// };

module.exports.UpdateUserPicture = async (options) =>{
    // options have parameters of get request
    let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
    let filteringRecord = filteringRecords[0];
    for (let key in options) {
            filteringRecord[key] = options[key];
      }
    console.log(filteringRecord);
    let dataRecords = await userDbAccessordbAccessor.update(filteringRecord);
    // removing unwanted columns from dataRecords
    // let responsedata = {"username":dataRecords.username, "email":dataRecords.email  }
    let responsedata = dataRecords;

    return responsedata;
};

module.exports.GetSubscriptionPreference = async (options) =>{
    // options have parameters of get request
    
    
    let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
    let filteringRecord = filteringRecords[0];
    // removing unwanted columns from dataRecords
    let responsedata = {"project_announcements_and_updates":filteringRecord.project_announcements_and_updates, 
                        "events_and_meetups":filteringRecord.events_and_meetups, 
                        "user_research_surveys":filteringRecord.user_research_surveys }
    return responsedata;
};

module.exports.UpdateSubscriptionPreference = async (options) =>{
    // options have parameters of get request
    
    
    let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
    let filteringRecord = filteringRecords[0];
    for (let key in options) {
        if (filteringRecord.hasOwnProperty(key)) {
            filteringRecord[key] = options[key];
        }
      }
    let dataRecords = await userDbAccessordbAccessor.update(filteringRecord);
    // removing unwanted columns from dataRecords
    // let responsedata = {"username":dataRecords.username, "email":dataRecords.email  }
    let responsedata = dataRecords;

    return responsedata;
};

module.exports.RemoveSubscriptionPreference = async (options) =>{
    // options have parameters of get request
    
    
    let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":options.auth0_id});
    let filteringRecord = filteringRecords[0];
    // removing unwanted columns from dataRecords
    let defaultdata = {"project_announcements_and_updates":false, 
                        "events_and_meetups":false, 
                        "user_research_surveys":false }
    for (let key in defaultdata) {
        if (filteringRecord.hasOwnProperty(key)) {
            filteringRecord[key] = defaultdata[key];
        }
    }
    let dataRecords = await userDbAccessordbAccessor.update(filteringRecord);
    // removing unwanted columns from dataRecords
    // let responsedata = {"username":dataRecords.username, "email":dataRecords.email  }
    let responsedata = dataRecords;
    return responsedata;
};
