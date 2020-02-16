const request = require('request-promise');
const nunjucks  = require('nunjucks');

// config and initialisation
const gitDomain= "https://raw.githubusercontent.com";
const gitProject = "ptm-poc";
const gitRepository = "ptm-public-templates";
const gitBranch = "master";
const gitURL =  gitDomain + "/" + gitProject + "/" + gitRepository + "/" + gitBranch;


function main(args) {
    /*
      used inputs:
         args.project
         args.mysql_user
         args.mysql_password
         args.target_fqdn
     */
    let project_arg = args.project

    let templateUrl = gitURL + "/custom-"+ project_arg + "-helm-values.yaml.jinja2";

    return new Promise( (resolve, reject) => {
        let options = {
            url: templateUrl
        };

        request(options).then( (htmlString) => {
            var renderedConfig = nunjucks.renderString(
                htmlString,
                {
                    mysql_user: args.mysql_user,
                    mysql_password: args.mysql_password,
                    project: args.project,
                    site_url: args.target_fqdn
                }
            );
            resolve({result: renderedConfig});
        })
        .catch( (errorFromRequest) =>  {
            reject( {error:errorFromRequest} );
        });

    });
}

exports.main = main;