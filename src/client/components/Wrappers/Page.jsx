// @flow
// dependencies
import React, { Component, type Element } from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import root from 'window-or-global';
import type { Location } from 'react-router-dom';
// asset
import logo from '../../assets/img/react.svg';


const {
  appTitle = '',
  defaultDescription = '',
  defaultTwitter = '',
  appUrl = '',
  facebookId = '',
} = root.browserEnv;

type Props = {
  children: Element<any>,
  location: Location,
  id?: string,
  className?: string,
  title?: string,
  description?: string,
  image?: string,
  contentType?: string,
  twitter?: string,
  noCrawl?: string,
  published?: string,
  updated?: string,
  category?: string,
  schema?: string,
  tags?: Array<string>,
};

class Page extends Component<Props> {
  static defaultProps = {
    id: '',
    schema: '',
    className: '',
    title: '',
    description: '',
    image: '',
    contentType: '',
    twitter: '',
    noCrawl: '',
    published: '',
    updated: '',
    category: '',
    tags: [],
  };

  defaultSep = ' | ';

  getMetaTags({
    title, description, image, contentType, twitter, noCrawl, published,
    updated, category, tags,
  }, pathname) {
    const theTitle = title
      ? (title + this.defaultSep + appTitle).substring(0, 60)
      : appTitle;

    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription;

    const theImage = image ? `${appUrl}${image}` : `${appUrl}${logo}`;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemrop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: defaultTwitter },
      { name: 'twitter:title', content: theTitle },
      { name: 'twitter:description', content: theDescription },
      { name: 'twitter:creator', content: twitter || defaultTwitter },
      { name: 'twitter:image:src', content: theImage },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: appUrl + pathname },
      { property: 'og:image', content: theImage },
      { property: 'og:escription', content: theDescription },
      { property: 'og:site_name', content: appTitle },
      { property: 'fb:app_id', content: facebookId },
    ];

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }
    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  }

  render() {
    const {
      children, id, className, location: { pathname }, ...rest
    } = this.props;

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`,
          }}
          title={
            rest.title ? rest.title + this.defaultSep + appTitle : appTitle
          }
          link={[
            {
              rel: 'canonical',
              href: appUrl + pathname,
            },
          ]}
          meta={this.getMetaTags(rest, pathname)}
        />
        {children}
      </div>
    );
  }
}

export default withRouter(Page);
