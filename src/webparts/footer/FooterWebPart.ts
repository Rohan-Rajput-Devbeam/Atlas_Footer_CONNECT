import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FooterWebPart.module.scss';
import * as strings from 'FooterWebPartStrings';

export interface IFooterWebPartProps {
  description: string;
  CurrentYear: any;
}

export default class FooterWebPart extends BaseClientSideWebPart<IFooterWebPartProps> {

  public render(): void {
    this.properties.CurrentYear = new Date().getFullYear();
    this.domElement.innerHTML = `
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
</head>
    <div class = "${styles.footer}">
    <div class = "${styles.footerContent}">
    <div class = "${styles.row}">
    <div class = "${styles.needhelp}" >
    <span class= ${styles.spanhelp}>Need Help?</span>
    </div>
    <div class = "${styles.footerVerbiage}">
    <div>
        For technical problems like logging in or loading pages.
        <a class=${styles.averbiage}  onMouseOver="this.style.color='#B31F3B'; style.backgroundColor='#323130'" onMouseOut="this.style.color='#CC0A0A'; style.backgroundColor='#323130'" href="mailto:ServiceDesk@beamsuntory.com">Click here for HELP
        </a>
    </div>
    <div>
        Can't find what you are looking for?
        <a class=${styles.averbiage}  onMouseOver="this.style.color='#B31F3B'; style.backgroundColor='#323130'" onMouseOut="this.style.color='#CC0A0A'; style.backgroundColor='#323130'" href="mailto:Connect@beamsuntory.com">Click here to ASK
        </a>
    </div>
    </div>

    <div class="${styles.footerlinks}">
            <span>
                <a class="${styles.a1}"  href="http://www.beamsuntory.com/" target="_blank">Beam Suntory Inc.

                </a>
            </span>
            <span>|
            </span>
            <span>
                <a class="${styles.a1}"  href="https://devbeam.sharepoint.com/sites/ModernConnect/SitePages/TermsConditions.aspx">Terms and Conditions
                </a>
            </span>
            <span>|
            </span>
            <span>
                <a class="${styles.a1}"  href="https://devbeam.sharepoint.com/sites/ModernConnect/SitePages/PrivacyPolicy.aspx" target="_blank">Privacy Policy
                </a>
            </span>
        </div>
        <div class="${styles.copyrightRow}">
            <span>CONNECT
                <span id="datetimeCopyRight">${escape(this.properties.CurrentYear)}</span>
                Beam Suntory Inc., 222 Merchandise Mart Plaza, Chicago, IL 60654.
            </span>
            <script type="text/JavaScript">//<![CDATA[ document.write(new Date().getFullYear())       
            //]]></script>
            <span>All Rights Reserved.
            </span>
        </div>
    </div>
    </div>
    </div>
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
