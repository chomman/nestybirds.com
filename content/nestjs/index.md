---
description: 'Nest.js 소개'
sidebar: 'nestjs'
---

# Nest.js 소개

Nest (NestJS)는 효율적이고 확장 가능한 [Node.js](https://nodejs.org/) 서버 측 애플리케이션을 구축하기위한 프레임워크입니다 . 프로그레시브 JavaScript를 사용하며 [TypeScript](http://www.typescriptlang.org/)를 기반으로 구축되어 완벽하게 지원합니다 (개발자가 순수 JavaScript로 코딩 할 수 있음). OOP(Object Oriented Programming), FP(Functional Programming) 및 FRP(Functional Reactive Programming) 요소를 결합합니다.

기본적으로 Nest는 [Express](https://expressjs.com/) (기본값)와 같은 강력한 HTTP Server 프레임워크를 사용하며 선택적으로 [Fastify](https://github.com/fastify/fastify) 도 사용하도록 구성할 수 있습니다!

Nest는 이러한 일반적인 Node.js 프레임 워크 (Express / Fastify) 위에 추상화 수준을 제공하지만 API를 개발자에게 직접 노출합니다. 이를 통해 개발자는 기본 플랫폼에서 사용할 수 있는 수많은 타사 모듈을 자유롭게 사용할 수 있습니다.


## 철학

최근 몇 년 동안 Node.js 덕분에 JavaScript는 프론트 및 백엔드 애플리케이션 모두에서 웹의 "lingua franca"가되었습니다. 그 결과 [Angular](https://angular.io/) , [React](https://github.com/facebook/react) 및 [Vue](https://github.com/vuejs/vue) 와 같은 멋진 프로젝트가 생겨 개발자 생산성을 향상시키고 빠르고 테스트 가능하며 확장 가능한 프론트엔드 애플리케이션을 만들 수 있습니다. 그러나 Node(및 서버측 Javascript)를 위한 우수한 라이브러리, 도우미 및 도구가 많이 존재하지만, 이들 중 어느 것도 아키텍처의 주요 문제를 효과적으로 해결하지는 못합니다. - 아키텍처.

Nest는 즉시 사용 가능한 애플리케이션 아키텍처를 제공하므로 개발자와 팀은 테스트 가능하고 확장 가능하며 느슨하게 결합되며 유지 관리가 쉬운 애플리케이션을 작성할 수 있습니다.


## 설치

시작하려면 [Nest CLI](https://docs.nestjs.com/v6/cli/overview)를 사용하여 프로젝트를 스캐폴드하거나 스타터 프로젝트를 복제하십시오 (둘 다 동일한 결과를 생성함).

Nest CLI를 사용하여 프로젝트를 스캐 폴딩하려면 다음 명령을 실행하십시오. 그러면 새 프로젝트 디렉토리가 생성되고 디렉토리에 초기 핵심 Nest 파일 및 지원 모듈이 채워져 프로젝트의 기본 구조가 생성됩니다. 처음 사용하는 경우 Nest CLI를 사용하여 새 프로젝트를 작성하는 것이 좋습니다. 우리는 First Steps 에서 이 접근법을 계속할 것 입니다.

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

다른 방법으로, 다음과 같이 Git을 사용하여 TypeScript 시작 프로젝트를 설치할 수도 있습니다.

```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

브라우저를 열고 http://localhost:3000/ 로 이동하십시오.

시작 프로젝트의 JavaScript 풍미를 설치하려면 위의 명령행에서 `javascript-starter.git`를 사용하십시오.

**npm** (또는 **yarn**)으로 코어 및 지원 파일을 설치하여 처음부터 새 프로젝트를 수동으로 만들 수도 있습니다. 이 경우, 물론 프로젝트 상용구 파일을 직접 작성해야 합니다.

```bash
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```


#### 주석

- *이 페이지는 [Nest.js](https://docs.nestjs.com/v6/first-steps)의 비공식 한글 번역본입니다.*