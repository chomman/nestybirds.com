---
description: '첫 단계'
sidebar: 'nestjs'
---

# 첫 단계

이 기사에서는 Nest 의 핵심 기본 원리를 배울 것입니다. Nest 애플리케이션의 필수 구성 요소에 익숙해 지도록 도입 단계에서 많은 부분을 다루는 기능을 갖춘 기본 CRUD 애플리케이션을 구축합니다.


## 언어

우리는 [TypeScript](http://www.typescriptlang.org/)를 좋아하지만 무엇보다도 [Node.js](https://nodejs.org/en/)를 좋아합니다. 그렇기 때문에 Nest는 TypeScript 및 **순수 JavaScript**와 호환됩니다 . Nest는 최신 언어 기능을 활용하므로 바닐라 JavaScript와 함께 사용하려면 [Babel](http://babeljs.io/) 컴파일러가 필요합니다 .

우리는 제공하는 예제에서 주로 TypeScript를 사용하지만 코드 스니펫을 언제나 바닐라 JavaScript 구문으로 전환할 수 있습니다 (각 스니펫의 오른쪽 상단 모서리에 있는 언어 버튼을 클릭하여 전환하십시오).


## 전제 조건

운영 체제에 [Node.js](https://nodejs.org/) (> = 8.9.0)가 설치되어 있는지 확인하십시오 .


## 설정

[Nest CLI](https://docs.nestjs.com/v6/cli/overview)를 사용하여 새 프로젝트를 설정하는 것은 매우 간단합니다. 설치된 [npm](https://www.npmjs.com/)으로 당신의 OS 터미널에서 다음 명령을 사용하여 새 Nest 프로젝트를 만들 수 있습니다:

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

`project` 디렉토리가 만들어질 것입니다. 여기에는 노드 모듈과 몇 가지 다른 상용구 파일이 설치됩니다. 그리고 여러 개의 코어 파일로 채워진 `src/` 디렉토리가 생성됩니다.

```
src
├── app.controller.ts
├── app.module.ts
└── main.ts
```

핵심 파일에 대한 간략한 개요는 다음과 같습니다.

|||
|------|---|
|**app.controller.ts**|단일 경로의 기본 컨트롤러 샘플|
|**app.module.ts**|응용 프로그램의 루트 모듈|
|**main.ts**|핵심 기능 `NestFactory`를 사용하여 Nest 애플리케이션 인스턴스를 작성하는 애플리케이션의 엔트리 파일|

`main.ts`에는 비동기 함수가 포함되어 응용프로그램을 **부트스트랩**합니다.


```js
// main.tsJS

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Nest 애플리케이션 인스턴스를 생성하기 위해 `NestFactory`클래스를 사용합니다. `NestFactory`는 응용프로그램 인스턴스를 만들 수 있는 몇 가지 정적 메서드를 제공합니다. 이 `create()` 메소드는 `INestApplication` 인터페이스를 이행하는 응용프로그램 객체를 반환합니다. 이 객체는 다음 장에서 설명하는 일련의 메소드를 제공합니다. 위의 `main.ts` 예제로 HTTP 리스너를 시작하면 애플리케이션이 인바운드 HTTP 요청을 기다릴 수 있습니다.

Nest CLI로 스캐폴딩된 프로젝트는 개발자가 각 모듈을 전용 디렉토리에 보관하는 규칙을 따르도록 장려하는 초기 프로젝트 구조를 만듭니다.


## 플랫폼

Nest는 플랫폼에 구애받지 않는 프레임워크를 목표로 합니다. 플랫폼 독립성을 통해 개발자는 여러 유형의 응용 프로그램에서 활용할 수 있는, 재사용이 가능한 논리적 파트를 만들 수 있습니다. 기술적으로 Nest는 어댑터가 생성되면 모든 Node HTTP 프레임워크와 작동할 수 있습니다. 기본적으로 지원되는 두 가지 HTTP 플랫폼 인 [express](https://expressjs.com/) 및 [fastify](https://www.fastify.io/)가 있습니다. 필요에 따라 적합한 것을 선택할 수 있습니다.

|||
|------|---|
|**platform-express**|[Express](https://expressjs.com/)는 노드에 대한 잘 알려진 미니멀리스트 웹 프레임워크입니다. 커뮤니티에서 구현한 많은 리소스를 갖추고 있으며, 실무에서 테스트된 프로덕션용 라이브러리입니다. `@nestjs/platform-express` 패키지가 기본으로 사용됩니다. 많은 사용자가 Express로 잘 사용하고 있으므로 걱정할 필요가 없습니다.|
|**platform-fastify**|[Fastify](https://www.fastify.io/)는 최대의 효율성과 속도를 제공하는 데 중점을 둔 고성능의 오버헤드가 낮은 프레임워크입니다. 사용 방법은 [여기](https://docs.nestjs.com/v6/techniques/performance)를 참조하십시오.|

어떤 플랫폼을 사용하든 자체 애플리케이션 인터페이스를 제공합니다. 이들은 각각 `NestExpressApplication`과 `NestFastifyApplication`로 표시됩니다.

아래 예제와 같이 플랫폼 유형을 `NestFactory.create()` 메소드에 전달하면 app 객체는 해당하는 특정 플랫폼에서만 사용할 수 있는 메소드를 갖게 됩니다. 그러나 기반 플랫폼 API에 접근하는 경우가 아니면 따로 유형을 지정할 필요가 없습니다 .

```js
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

## 응용 프로그램 실행 

설치 프로세스가 완료되면 운영체제 명령 프롬프트에서 다음 명령을 실행하여 인바운드 HTTP 요청을 수신하는 애플리케이션을 시작할 수 있습니다.

```bash
$ npm run start
```

이 명령은 `src/main.ts` 파일에 정의된 포트에서 수신하는 HTTP 서버로 앱을 시작합니다. 응용 프로그램이 실행되면 브라우저를 열고 http://localhost:3000/ 로 이동하십시오. Hello World! 메시지를 보게 될 것입니다.


#### 주석

- *이 페이지는 [Nest.js](https://docs.nestjs.com/v6/first-steps)의 비공식 한글 번역본입니다.*