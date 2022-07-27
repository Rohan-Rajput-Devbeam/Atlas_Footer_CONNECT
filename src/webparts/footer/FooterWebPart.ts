import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FooterWebPart.module.scss';
import * as strings from 'FooterWebPartStrings';
import { sp } from "@pnp/sp/presets/all";
import { CurrentUser } from 'sp-pnp-js/lib/sharepoint/siteusers';
import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { sp } from "@pnp/sp/presets/all";

export interface IFooterWebPartProps {
  description: string;
  CurrentYear: any;
  htmlBody: any;
  currentUserLanguage: any;

}

export default class FooterWebPart extends BaseClientSideWebPart<IFooterWebPartProps> {


  public async componentDidMount() {
    //   sp.setup({
    //     spfxContext: this.context
    // });
    //   let tempvar = await sp.web.currentUser.get();
    //   console.log(tempvar)
    //   this.getUserLanguage('Preference',tempvar.Email);
  }


  public async getUserLanguage(listName: string, userEmail: string) {
    // var listName = 'Preference'
    try {
      let listItems: any[] = await sp.web.lists.getByTitle(listName)
        .items
        // .select("Language, id")
        .filter("Title eq '" + userEmail + "'")
        //.top(Number(slideCount))
        .expand().get();

      let userLanguage = listItems.map(e => (e.Language))
      let userID = listItems.map(e => (e.Id))
      // this.userIDinPreferenceList = userID[0];

      // // console.log("I am list Items");
      // // console.log(listItems);
      // // console.log(userLanguage);
      // console.log(this.userIDinPreferenceList)
      // console.log(userID)
      // console.log(userLanguage)
      this.properties.currentUserLanguage = userLanguage

      // this.properties.htmlBody = await this.getFooter('Footer')

      return userLanguage;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async getFooter() {
    try {
      let listItems: any[] = await sp.web.lists.getByTitle('Footer')
          .items
          // .select("Language, id")
          .filter("Title eq '" + this.properties.currentUserLanguage + "'")
          //.top(Number(slideCount))
          .expand().get();
    
      let testBody = listItems.map(e => (e.BodyText))
      // console.log(testBody)
      return testBody;
    } catch (err) {
      Promise.reject(err);
    }


    

  }




  public async render(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

   
    let tempvar = await sp.web.currentUser.get();
    // console.log(tempvar)
    let tempUsrLang = await this.getUserLanguage('Preference', tempvar.Email);
    // console.log(tempUsrLang)
    let temp11 = await this.getFooter()
    this.properties.htmlBody = temp11[0]
    // console.log(this.properties.htmlBody)

    const myArray = this.properties.htmlBody.split(",");
    // console.log(myArray)
    this.properties.htmlBody = myArray









    this.properties.CurrentYear = new Date().getFullYear();
    this.domElement.innerHTML = `
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
</head>
<div class = "${styles.footer}"><div class = "${styles.footerContent}"><div class = "${styles.row}"><div class = "${styles.needhelp}"><span class= ${styles.spanhelp}>
${escape(this.properties.htmlBody[0])}
 </span></div><div class = "${styles.footerVerbiage}"><div>
 ${escape(this.properties.htmlBody[1])}
 <a class=${styles.averbiage} onMouseOver="this.style.color='#B31F3B'; style.backgroundColor='#323130'" onMouseOut="this.style.color='#CC0A0A'; style.backgroundColor='#323130'" href="mailto:ServiceDesk@beamsuntory.com">
${escape(this.properties.htmlBody[2])}
   
  </a></div><div> 
${escape(this.properties.htmlBody[3])}
  
   <a class=${styles.averbiage} onMouseOver="this.style.color='#B31F3B'; style.backgroundColor='#323130'" onMouseOut="this.style.color='#CC0A0A'; style.backgroundColor='#323130'" href="mailto:Connect@beamsuntory.com">
${escape(this.properties.htmlBody[4])}
 
   </a></div></div><div class="${styles.footerlinks}"><span><a class="${styles.a1}" href="http://www.beamsuntory.com/" target="_blank">Beam Suntory Inc. </a></span><span>| </span><span><a class="${styles.a1}" href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/TermsConditions.aspx">Terms and Conditions </a></span><span>| </span><span><a class="${styles.a1}" href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/PrivacyPolicy.aspx" target="_blank">Privacy Policy </a></span></div><div class="${styles.copyrightRow}"><span> CONNECT <span id="datetimeCopyRight"> ${escape(this.properties.CurrentYear)} </span> Beam Suntory Inc., 222 Merchandise Mart Plaza, Chicago, IL 60654. </span><script type="text/JavaScript">;</script><span> All Rights Reserved. </span></div></div></div></div>
    `;

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
