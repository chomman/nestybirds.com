---
description: '개요'
sidebar: 'nestjs'
---

# 첫 단계

이 기사에서는 Nest 의 핵심 기본 사항 을 학습합니다 . Nest 애플리케이션의 필수 구성 요소에 익숙해 지도록 입문 레벨에서 많은 기초를 다루는 기능을 갖춘 기본 CRUD 애플리케이션을 빌드합니다.


## 언어

우리는 TypeScript 를 좋아 하지만 무엇보다도 Node.js 를 좋아 합니다. 그렇기 때문에 Nest는 TypeScript 및 순수 JavaScript 와 호환됩니다 . Nest는 최신 언어 기능을 활용하므로 바닐라 JavaScript와 함께 사용하려면 Babel 컴파일러 가 필요합니다 .

우리는 주로 제공하는 예제에서 TypeScript를 사용하지만 항상 코드 스 니펫 을 바닐라 JavaScript 구문으로 전환 할 수 있습니다 (각 스 니펫의 오른쪽 상단 모서리에있는 언어 버튼을 클릭하여 전환하십시오).


## 전제 조건

운영 체제에 Node.js (> = 8.9.0)가 설치되어 있는지 확인하십시오 .


## 설정

Nest CLI를 사용하여 새 프로젝트를 설정하는 것은 매우 간단합니다 . 로 NPM이 설치, 당신은 당신의 OS 터미널에서 다음 명령을 사용하여 새 둥지 프로젝트를 만들 수 있습니다 :

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

project디렉토리는 노드 모듈과 몇 가지 다른 상용구 파일이 설치됩니다 생성됩니다 및 src/디렉토리는 여러 개의 코어 파일을 생성하고 채워집니다.

```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

브라우저를 열고로 이동하십시오 http://localhost:3000/.

시작 프로젝트의 JavaScript 특징을 설치하려면 javascript-starter.git위의 명령 순서를 사용 하십시오.

npm (또는 yarn )으로 코어 및 지원 파일을 설치하여 처음부터 새 프로젝트를 수동으로 만들 수도 있습니다 . 이 경우 물론 프로젝트 상용구 파일을 직접 작성해야합니다.

```bash
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```


### 주석

이 페이지는 [Nest.js](https://docs.nestjs.com/v6/)의 비공식 한글 번역본입니다.