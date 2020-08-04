// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'NestyBirds',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://nestybirds.com'),
  settings: {
    web: process.env.URL_WEB || false,
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || false,
    nav: {
      links: [
        //{ path: '/docs/', title: 'Docs' },
        // { path: '/zero2sold/', title: 'Zero to Sold' },
        { path: '/nestjs/', title: 'Nest.js' }
      ]
    },
    sidebar: [
      // {
      //   name: 'docs',
      //   sections: [
      //     // {
      //     //   title: 'Getting Started',
      //     //   items: [
      //     //     '/docs/',
      //     //     '/docs/installation/',
      //     //     '/docs/writing-content/',
      //     //     '/docs/deploying/',
      //     //   ]
      //     // },
      //     {
      //       title: 'Configuration',
      //       items: [
      //         '/docs/settings/',
      //         '/docs/sidebar/',
      //       ]
      //     }
      //   ]
      // },
      {
        name: 'nestjs',
        sections: [
          {
            title: '소개',
            items: [
              '/nestjs/',
            ]
          },
          {
            title: '개요',
            items: [
              '/nestjs/first-step/',
              '/nestjs/controllers/',
              '/nestjs/providers/',
            ]
          },
          // {
          //   title: '기초기술',
          //   items: [
          //     '/nestjs/fundmental/',
          //   ]
          // }
        ]
      },
      // {
      //   name: 'zero2sold',
      //   sections: [
      //     {
      //       title: '책 소개',
      //       items: [
      //         '/zero2sold/',
      //         '/zero2sold/introduction/',
      //       ]
      //     },
      //     {
      //       title: '부트스트랩',
      //       items: [
      //         '/zero2sold/feedbackpanda/',
      //         '/zero2sold/bootstrapping/',
      //       ]
      //     }
      //   ]
      // },
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {  
      }
    }

  ]
}
