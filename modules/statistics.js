var getBookmarkStats = function (loggedInUser) {

    if(loggedInUser='admin')
    {
        loggedInUser = 'wso2.system.user' ;
    }

    var db = new Database("WSO2_CARBON_DB");
    var queryResults = db.query("SELECT RR.REG_NAME AS asset_id, RS.REG_MEDIA_TYPE AS asset_type,COUNT(RR.REG_NAME) AS no_of_bookmarks " +
        "FROM REG_RESOURCE RS " +
        "JOIN REG_RESOURCE RR ON RS.REG_UUID=RR.REG_NAME " +
        "JOIN REG_PATH RP ON  RR.REG_PATH_ID = RP.REG_PATH_ID " +
        "WHERE RS.REG_CREATOR = '" + loggedInUser +"' AND " +
        "RP.REG_PATH_VALUE like '/_system/governance/users/store%' AND " +
        "RR.REG_NAME IS NOT NULL GROUP BY RR.REG_NAME");

    return queryResults;

};

var filterResultsByAssetType = function (array,type) {
    return array.filter(function (el) {
        return el.ASSET_TYPE == 'application\/vnd.wso2-' + type + '+xml';
    });
}






