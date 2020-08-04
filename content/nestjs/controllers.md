---
description: ''
sidebar: 'nestjs'
---

# 컨트롤러

컨트롤러는 클라이언트로부터 들어오는 요청을 처리하고 응답값을 반환합니다.

![클라이언트의 요청 진입점](https://docs.nestjs.com/assets/Controllers_1.png "클라이언트의 요청 진입점")

컨트롤러의 목적은 응용프로그램에 대한 특정 요청을 받는 것입니다. *라우팅* 매커니즘은 어떤 컨트롤러가 어떤 요청을 수신하는지 제어합니다. 종종 각 컨트롤러는 둘 이상의 경로를 가지고 있으며, 서로 다른 경로가 다른 동작을 수행할 수도 있습니다.

기본 컨트롤러를 만들기 위해 클래스와 *데코레이터*를 사용합니다. 데코레이터는 클래스를 필요한 메타데이터와 연결하고 Nest가 라우팅 맵을 생성할 수 있도록 합니다 (요청을 해당 컨트롤러에 연결).


## 라우팅

다음 예제에서는 기본 컨트롤러를 정의하는 데 필요한 `@Controller()` 데코레이터를 사용합니다. 우리는 `cats`라는 선택적 경로 경로 접두어를 지정할 것입니다. 데코레이터에서 경로 접두사를 사용하면 관련된 경로 쉽게 그룹화하고 반복적인 코드를 최소화 할 수 있습니다. 예를 들어, 우리는 고객과의 상호 작용을 관리하는 일련의 라우트 세트를 `/customers` 라우 밑으로 그룹화하도록 선택할 수 있습니다. 이 경우 `@Controller()` 데코레이터에서 `customers` 경로 접두사를 지정하여 파일의 각 경로에 대해 경로의 해당 부분을 반복 할 필요가 없습니다.

```js
// cats.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

> **힌트**

> CLI를 사용하여 컨트롤러를 만들려면 간단히 

> `$ nest g controller cats` 명령을 실행하십시오.

 `findAll()` 메서드 앞에 있는 `@Get()` HTTP 요청 메소드 데코레이터는 Nest에게 HTTP 요청에 대한 특정 엔드포인트에 대한 핸들러를 작성하도록 지시합니다. 엔드포인트는 HTTP 요청 메서드(이 경우 GET) 및 라우트 경로에 해당합니다. 라우터 경로란 무엇일까요? 핸들러의 라우트 경로는 컨트롤러에 선언된 (선택적) 접두사와 요청 데코레이터에 지정된 경로를 연결하여 결정됩니다. 우리는 모든 경로에 대하여 공통적인 접두사 라우트(`cats`)를 선언했고, 데코레이터에 어떤 경로 정보도 추가하지 않았으므로 Nest는 `GET /cats` 요청을 이 핸들러에 매핑합니다. 언급한 바와 같이, 라우터 경로에는 선택적 컨트롤러 접두사와 요청 메소드 데코레이터에 선언된 모든 경로 문자열이 모두 포함됩니다. 예를 들어, 접두사 `customers`와 결합된 데코레이터 `@Get('profile')`는 `GET /customers/profile`와 같은 요청에 대한 라우터 매핑을 생성합니다 .

위의 예에서, 이 엔드포인트에 GET 요청이 들어오면 Nest는 해당 요청을 사용자가 정의한 `findAll()` 메소드로 라우팅합니다. 여기서 선택한 메소드 이름은 완전히 임의적입니다. 경로를 바인딩할 메소드를 선언해야 하지만 Nest는 선택한 메소드 이름에 아무런 의미도 부여하지 않습니다.

이 메소드는 200 상태 코드 및 연관된 응답(이 경우 문자열)을 반환합니다. 왜 그런 일이 생기는 거지? 설명을 위해 먼저 Nest가 응답을 조작하기 위해 두 가지 다른 옵션을 사용한다는 개념을 소개합니다.

|||
|------|---|
|표준(권장)|이 내장 메소드를 사용하여 요청 핸들러가 자바스크립트 오브젝트 또는 배열을 리턴하면 **자동으로** JSON으로 직렬화됩니다. 그러나 자바스크립트 기본 데이터타입(예를 들어, `string`, `number`, `boolean`)을 반환하는 경우, Nest는  직렬화를 시도하지 않고 바로 값을 전송합니다. 따라서 응답 처리가 간단해집니다. 값을 반환하면 Nest가 나머지를 처리합니다. <br>또한 201을 사용하는 POST 요청을 제외하면 응답의 `상태 코드`는 기본적으로 항상 200입니다. 우리는 `@HttpCode(...)` 데코레이터를 핸들러 레벨에 추가하여 이러한 동작을 손쉽게 변경할 수 있습니다( [상태 코드](https://docs.nestjs.com/v6/controllers#status-code) 참조 ).|
|라이브러리|메서드 핸들러에 `@Res()` 데코레이터를 주입하여 라이브러리별(예: Express) [응답 객체](http://expressjs.com/en/api.html#res)도 사용할 수 있습니다 (예: `findAll(@Res() response)`). 이 접근방법을 사용하면 해당 객체가 노출하는 네이티브 응답 처리 방법을 사용할 수 있게(그리고 책임도 지게) 됩니다. 예를 들어, Express에서는 `response.status(200).send()`와 같은 코드를 사용하여 응답을 구성할 수 있습니다.|

> **<font color="#ed8529">경고</font>**

> 두 가지 접근법을 동시에 사용할 수는 없습니다. Nest는 핸들러가 `@Res()` 또는 `@Next()` 중 하나를 사용하고 있을 때를 감지하여 라이브러리 옵션을 선택했음을 나타냅니다. 만약 두 접근법을 동시에 사용하는 경우, 표준 접근법은 이 단일 라우터에 대해 <font color="#ed8529">자동으로 비활성화</font>되며 더 이상 원하는 방식으로 작동하지 않게 됩니다.


## 요청 객체

핸들러는 종종 클라이언트의 `요청` 세부 사항에 접근해야 할 필요가 있습니다. Nest는 기반 플랫폼(기본적으로 Express)의 [요청 객체](http://expressjs.com/en/api.html#req)에 대한 접근방법을 제공합니다 . 우리는 `@Req()` 데코레이터를 핸들러에 추가하여 Nest에게 주입하도록 지시하면 요청 객체에 접근할 수 있습니다.

```js
// cats.controller.ts

import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

> **힌트**

> `express`의 명시적 타이핑(위 `request: Request`매개변수 예시와 같이)을 활용하려면 `@types/express` 패키지를 설치하십시오.

요청 객체는 HTTP 요청을 나타내며 요청 쿼리 문자열, 매개변수, HTTP 헤더 및 본문에 대한 속성을 가지고 있습니다 ([자세히 보기](http://expressjs.com/en/api.html#req)). 대부분의 경우 이러한 속성을 수동으로 가져올 필요는 없습니다. 대신에 `@Body()` 또는 `@Query()` 같은 전용 데코레이터를 사용할 수 있습니다. 아래는 제공된 데코레이터와 일반 플랫폼 별로 표시하는 오브젝트 목록입니다.

|||
|------|---|
|`@Request()`|`req`|
|`@Response(), @Res()*`|`res`|
|`@Next()`|`next`|
|`@Session()`|`req.session`|
|`@Param(key?: string)`|`req.params` / `req.params[key]`|
|`@Body(key?: string)`|`req.body` / `req.body[key]`|
|`@Query(key?: string)`|`req.query` / `req.query[key]`|
|`@Headers(name?: string)`|`req.headers` / `req.headers[name]`|
|`@Ip()`|`req.ip`|

* 기본 HTTP 플랫폼(예 : Express 및 Fastify)에서 입력과의 호환성을 위해 Nest는 `@Res()`와 `@Response()` 데코레이터를 제공합니다 . `@Res()`는 단순히 `@Response()`의 별칭입니다. 둘 다 기본 네이티브 플랫폼의 `response` 객체 인터페이스를 직접 노출합니다. 그것들을 사용할 때나, 또는 최대로 활용하기 위해 기본 라이브러리의 타이핑(예: `@type/express`)을 import해야 합니다. 메서드 핸들러에 `@Res()` 또는 `@Response()`를 주입하면, Nest는 해당 핸들러에 대하여 `라이브러리별 모드`에 넣게 되며, 당신은 응답 관리를 책임지게 된다는 점에 유의하십시오. 그런 경우 `response` 객체(예: `res.json(...)` 또는 `res.send(...)`)를 호출하여 어떠한 종류의 응답처리를 해야 하며, 그렇게 하지 않으면 HTTP 서버가 중단됩니다.

> **힌트**

> 나만의 맞춤 데코레이터를 만드는 방법을 알아 보려면 [이 챕터](https://docs.nestjs.com/v6/custom-decorators)를 방문하십시오 


## 리소스

앞서 우리는 cats 리소스 (**GET** 라우터)를 가져오는 엔드포인트를 정의했습니다. 우리는 또 일반적으로 새 레코드를 작성하는 엔드포인트를 제공하기를 원할 것입니다. 이를 위해 POST 핸들러를 만들어 봅시다 :

```js
// cats.controller.ts

import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

간단합니다. Nest는 표준 HTTP 요청 엔드포인트 데코레이터의 나머지 부분을 동일한 방식으로 제공합니다 - `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, `@All()`. 각각은 그의 HTTP 요청 메서드를 나타냅니다.

## 라우터 와일드 카드

패턴 기반의 라우터도 지원됩니다. 예를 들어 별표(아스터리스크)는 와일드 카드로 사용되며 모든 문자 조합과 일치합니다.

```js
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

`'ab*cd'` 라우터 경로는 `abcd`, `ab_cd`, `abecd` 등과 일치합니다. `?`, `+`, `*`, 및 `()` 등의 문자는 라우트 경로에 사용할 수 있고, 그들의 정규 표현식에 대응하는 하위 집합이라고 할 수 있습니다. 하이픈(`-`)과 닷(`.`)은 문자 그대로 문자열 기반 경로로 해석됩니다.


## 상태 코드 

언급한대로 응답 상태 코드는 201인 POST 요청을 제외하고 기본적으로 항상 200입니다. 핸들러 수준에서 `@HttpCode(...)` 데코레이터를 추가하여 이 동작을 쉽게 변경할 수 있습니다.

```js
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

> **힌트**

> `@nestjs/common` 패키지에서 `HttpCode`를 import 합니다.

상태 코드는 정적이지 않지만 다양한 요인에 따라 달라집니다. 이 경우 라이브러리 특정 응답(`@Res()`을 사용하여 주입) 객체를 사용하거나 오류가 발생한 경우 예외를 발생시킬 수 있습니다.


## 헤더

사용자 정의 응답 헤더를 지정하려면 `@Header()` 데코레이터를 사용하거나 또는 라이브러리 특정 응답 객체를 사용하고 `res.header()`를 직접 호출할 수 있습니다.

```js 
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

> **힌트**

> `@nestjs/common` 패키지에서 `Header`를 import 합니다.


## 리다이렉션

응답을 특정 URL로 리디렉션하려면 `@Redirect()` 데코레이터를 사용하거나 또는 라이브러리 별 응답 객체를 사용하고 `res.redirect()`를 직접 호출할 수 있습니다.

`@Redirect()`는 필수값 `url` 인자와 선택값 `statusCode` 인자를 사용합니다. `statusCode`는 생략하는 경우 기본값으로 `302`(`Found`)가 됩니다.

```js 
@Get()
@Redirect('https://nestjs.com', 301)
```

때로는 HTTP 상태 코드 또는 리디렉션 URL을 동적으로 결정해야 할 수도 있습니다. 라우터 핸들러 메소드에서 그러한 형태로 오브젝트를 반환하여 이를 수행하십시오:

```js 
{
  "url": string,
  "statusCode": number
}
```

반환 된 값은 `@Redirect()` 데코레이터에 전달된 모든 인자보다 우선합니다. 예를 들면 다음과 같습니다.

```js 
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```


## 라우터 매개변수

요청의 일부로 **동적 데이터**를 받아야 할 필요가 있는 경우(예: ID가 `1`인 고양이를 얻으려면 `GET /cats/1`) 정적 라우터는 작동하지 않는다. 매개변수를 사용하여 라우터를 정의하기 위해서는 라우터의 경로에 라우터 매개변수 토큰을 추가하여 요청 URL의 해당 위치에서 동적 값을 캡처할 수 있다. 아래의 `@Get()` 데코레이터에 있는 경로 매개변수 토큰은 이러한 사용법을 보여준다. 이러한 방식으로 선언된 라우터 매개변수는 `@Param()` 데코레이터를 사용하여 접근할 수 있으며 메서드에 추가해야 합니다.

```js 
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

@Param()는 메소드 매개변수(위 예에서는 `params`)를 장식하는 데 사용되며 라우터 매개변수를 메소드 본문 내에서 장식된 메소드 매개변수의 속성으로 사용가능하게 합니다. 위의 코드에서 볼 수 있듯이 `params.id` 참조를 통해 `id` 매개변수에 접근할 수 있습니다. 특정 매개변수 토큰을 데코레이터에 전달한 다음 메서드 본문에서 해당 변수명으로 직접 라우터 매개변수를 참조할 수도 있습니다.

> **힌트**

> `@nestjs/common` 패키지에서 `Param`을 import 합니다.

```js 
@Get(':id')
findOne(@Param('id') id): string {
  return `This action returns a #${id} cat`;
}
```


## 하위 도메인 라우팅

`@Controller` 데코레이터는 수신을 요청하는 HTTP 호스트가 특정한 값과 일치하도록 요구하는 `host` 옵션을 취할 수 있습니다.

```js 
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

> **<font color="#ed2945">경고</font>**

> <font color="#ed2945">Fastify</font>는 중첩 라우터에 대한 지원이 없기 때문에 하위 도메인 라우팅을 사용할 때 (기본)Express 어댑터를 대신 사용해야 합니다.

라우터 `path`와 유사하게 `hosts` 옵션은 토큰을 사용하여 호스트 이름에서 해당 위치의 동적 값을 캡처 할 수 있습니다. 아래의 `@Controller()` 데코레이터 예제에서는 이러한 호스트 매개변수 토큰의 사용법을 보여줍니다. 이러한 방식으로 선언 된 호스트 매개변수는 `@HostParam()` 데코레이터를 사용하여 접근할 수 있으며 메소드에 추가해야 합니다.

```js 
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```

## 스코프(범위)

다른 프로그래밍 언어 배경을 가진 사람들의 경우 Nest에서는 외부 요청에 거의 모든 것이 공유된다는 것을 배우는 것은 예상치 못한 일일 수 있습니다. 우리는 데이터베이스 커넥션 풀, 전역 상태를 가진 싱글톤 서비스 등을 가지고 있습니다. Node.js는 별도의 스레드에 의해 모든 요청이 처리되는 요청/응답 다중 스레드 상태 비저장 모델을 따르지 않습니다. 따라서 싱글톤 인스턴스를 사용하는 것이 우리의 애플리케이션에 완전히 안전합니다.

그러나 요청 기반의 컨터롤러 수명으로 작동하기를 바라는 경우, 예를 들어 GraphQL 애플리케이션의 요청 별 캐싱, 요청 추적 또는 다중 테넌시와 같은 경우가 있습니다. [여기](https://docs.nestjs.com/fundamentals/injection-scopes)에서 스코프를 제어하는 ​​방법을 알아보십시오.


## 비동기성

우리는 현대적인 JavaScript를 좋아하며 데이터 추출이 대부분 비동기적이라는 것을 알고 있습니다. 이것이 Nest가 `async` 기능을 지원하고 잘 작동하는 이유입니다.

> **힌트**

> `async / await` 기능에 대한 자세한 내용은 [여기](https://kamilmysliwiec.com/typescript-2-1-introduction-async-await)를 참조하십시오.


모든 비동기 함수는 `Promise`를 반환해야합니다. 즉, Nest가 자체적으로 해결할 수 있는 지연된 값을 리턴할 수 있습니다. 이것에 대한 예를 봅시다 :

```js 
// cats.controller.ts

@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

위의 코드는 완전히 유효합니다. 또한 Nest 라우터 처리기는 RxJS [Observable 스트림](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)을 반환할 수 있어 훨씬 강려크합니다. Nest는 아래의 소스를 자동으로 구독하고 (스트림이 완료되면) 마지막으로 방출된 값을 취합니다.

```js 
// cats.controller.ts

@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

위의 두 가지 방법 모두 작동하며 요구 사항에 맞는 것을 사용할 수 있습니다.


## 요청 페이로드 

앞선 POST 라우터의 예제에서는 클라이언트 매개변수를 허용하지 않았습니다. 여기에서는 `@Body()` 데코레이터를 추가하여 이 문제를 해결하겠습니다.

하지만 먼저 (TypeScript를 사용하는 경우) DTO(Data Transfer Object) 스키마를 결정해야 합니다 . DTO는 네트워크를 통해 데이터가 전송되는 방식을 정의하는 개체입니다. **TypeScript** 인터페이스를 사용하거나 간단한 클래스를 사용하여 DTO 스키마를 확인할 수 있습니다. 흥미롭게도 여기에서 **class**를 사용하는 것이 좋습니다 . 왜? class는 JavaScript ES6 표준의 일부이므로 컴파일된 JavaScript에서 실제 엔티티로 유지됩니다. 반면, 변환 과정에서 TypeScript 인터페이스가 제거되므로 Nest는 런타임시 인터페이스를 참조할 수 없습니다. **파이프**와 같은 기능은 런타임에 변수의 메타 타입에 액세스할 때 추가 가능성을 가능하게 하기 때문에 중요합니다.

`CreateCatDto` 클래스를 만들어 봅시다 :

```js 
// create-cat.dto.ts

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

세 가지 기본 속성만 있습니다. 그런 다음 새로 만든 DTO를 다음 `CatsController`에서 사용할 수 있습니다.

```js 
// cats.controller.ts

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```


## 에러 처리 

에러 처리 (예 : 예외 작업)에 대한 별도의 장이 [여기](https://docs.nestjs.com/exception-filters)에 있습니다.



## 전체 컨터롤러 샘플 

아래는 여러 데코레이터를 사용하여 기본 컨트롤러를 만드는 예제입니다. 이 컨트롤러는 내부 데이터에 액세스하고 조작하는 몇 가지 방법을 제공합니다.

```js 
// cats.controller.ts

import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```


## 등록 및 실행 

위의 컨트롤러가 완전히 정의된 경우 Nest는 여전히 CatsController존재 하는지 알지 못하므로 결과적으로 이 클래스의 인스턴스를 만들지 않습니다.

컨트롤러는 항상 모듈에 속하므로 `@Module()` 데코레이터 내에 있는 `controllers` 배열에 포함시킵니다. 우리는 아직 root `AppModule` 이외의 다른 모듈을 정의하지 않았으므로, 다음과 같이 `CatsController`로 등록합시다: 

```js
// app.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

`@Module()` 데코레이터를 사용하여 메타데이터를 모듈 클래스에 추가했고, Nest는 이제 어떤 컨트롤러를 마운트해야 하는지를 알고 쉽게 반영할 수 있습니다.


## 부록: 라이브러리 별 접근 방식

지금까지 우리는 Nest 표준 응답 조작 방법에 대해 설명했습니다. 응답을 조작하는 두 번째 방법은 라이브러리 별 응답 오브젝트를 사용하는 것입니다. 특정 응답 객체를 주입하려면 `@Res()` 데코레이터를 사용해야 합니다. 차이점을 보여주기 위해 다음과 같이 `CatsController`를 다시 작성해 보겠습니다 .

```js
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

이 접근방식은 잘 작동하며, 실제로 응답 객체(헤더 조작, 라이브러리 특정 기능 등)를 완전히 제어하여 더 많은 유연성을 허용하지만 주의해서 사용해야 합니다. 일반적으로 이 접근 방식은 훨씬 덜 명확하며 몇 가지 단점이 있습니다. 주요 단점은 인터셉터 및 `@HttpCode()` 데코레이터와 같은 Nest 표준 응답 처리에 의존하는 Nest 기능과의 호환성이 손실된다는 것입니다. 또한 코드가 플랫폼에 따라 달라지며 (기본 라이브러리는 응답 객체에 대해 다른 API를 가질 수 있음) 테스트하기가 더 어렵습니다 (응답 객체에 대한 모형을 준비해야 하는 등..).

결론적으로, 가능하다면 Nest 표준 접근 방식을 언제나 우선적으로 고려해야 합니다.


#### 주석

- *이 페이지는 [Nest.js](https://docs.nestjs.com/controllers)의 비공식 한글 번역본입니다.*