---
description: '기초기술'
sidebar: 'nestjs'
---

# Custom 공급자

이전 장에서는 의존성 주입(DI)의 다양한 측면과 Nest에서 사용되는 방법에 대해 살펴 보았습니다. 이에 대한 예로는 인스턴스(종종 서비스 공급자)를 클래스에 주입하는 데 사용되는 생성자 기반 종속성 주입이 있습니다. 당신은 Nest 코어에 의존성 주입이 기본적으로 내장되어 있다는 사실을 알고도 놀라지 않을 것입니다. 지금까지 하나의 주요 패턴만 살펴 보았습니다. 응용 프로그램이 점점 복잡해짐에 따라 DI 시스템의 모든 기능을 활용해야 할 수 있으므로 더 자세히 살펴 보겠습니다.


## 의존성 주입(DI) 기초

의존성 주입은 자신의 코드에서 명령을 수행하는 대신 의존성 인스턴스의 생성을 IoC 컨테이너(이 경우 NestJS 런타임 시스템)에 위임하는 IoC(Inversion of Control) 기술입니다. 이 장에서 무엇을 설명할 지 Providers 챕터에서 살펴 보겠습니다.

먼저 공급자를 정의합니다. @Injectable()데코레이터에 표시된와 CatsService 공급자로서 클래스입니다.

```js 
// cats.service.ts

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```

그런 다음 Nest가 공급자를 컨트롤러 클래스에 주입하도록 요청합니다.

```js 
// cats.controller.ts

import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

마지막으로 Nest IoC 컨테이너에 공급자를 등록합니다.

```js 
// app.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

이 작업을 수행하기 위해 표지 아래에서 정확히 무슨 일이 일어나고 있습니까? 이 과정에는 세 가지 주요 단계가 있습니다.

에서 cats.service.ts의 @Injectable()장식이 선언 CatsService둥지 IoC 컨테이너에 의해 관리 할 수있는 클래스와 클래스.

이어 cats.controller.ts, CatsController온 종속성 선언 CatsService생성자 분사 토큰 :

```js 
constructor(private readonly catsService: CatsService)
```

에서 app.module.ts, 우리는 토큰을 연관 CatsService클래스로 CatsService로부터 cats.service.ts파일. 우리는거야 아래 참조 본 협회 (또한 정확히 어떻게 등록 ) 발생합니다.

Nest IoC 컨테이너가를 인스턴스화 CatsController하면 먼저 모든 종속성을 찾습니다 *. CatsService종속성을 찾으면 등록 단계 (위의 3 번) 에 따라 CatsService토큰을 검색 하여 CatsService클래스 를 반환합니다 . SINGLETON범위 (기본 동작)를 가정하면 Nest는의 인스턴스를 만들어 CatsService캐시하고 반환하거나 이미 캐시 된 경우 기존 인스턴스를 반환합니다.

*이 설명은 요점을 설명하기 위해 약간 단순화되었습니다. 우리가 염두에 두었던 중요한 영역 중 하나는 종속성에 대한 코드 분석 프로세스가 매우 정교하며 응용 프로그램 부트 스트래핑 중에 발생한다는 것입니다. 주요 특징 중 하나는 의존성 분석 (또는 "의존성 그래프 생성")이 전 이적이라는 것 입니다. 위의 예에서, 그 CatsService자체가 의존성을 가지고 있다면 그것들도 해결 될 것입니다. 종속성 그래프는 종속성이 본질적으로 "맨 아래로"올바른 순서로 해결되도록합니다. 이 메커니즘을 통해 개발자는 복잡한 종속성 그래프를 관리하지 않아도됩니다.


### 표준 프로바이더

@Module()데코레이터를 자세히 살펴 보겠습니다. 에서 다음 app.module을 선언합니다.

```js 
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
```

이 providers속성은의 배열을 사용 providers합니다. 지금까지 클래스 이름 목록을 통해 해당 공급자를 제공했습니다. 실제로 구문 providers: [CatsService]은보다 완전한 구문을위한 약칭입니다.

```js 
providers: [
  {
    provide: CatsService,
    useClass: CatsService,
  },
];
```

이제 이 명시적 구성을 보았으므로 등록 프로세스를 이해할 수 있습니다. 여기에서 토큰 CatsService과 클래스를 명확하게 연관시킵니다 CatsService. 속기 표기법은 가장 일반적인 사용 사례를 단순화하기위한 편의 일 뿐이며, 동일한 이름으로 클래스 인스턴스를 요청하는 데 토큰이 사용됩니다.


### 커스텀 프로바이더

귀하의 요구 사항이 표준 제공자가 제공 한 요구 사항을 넘어 서면 어떻게됩니까 ? 다음은 몇 가지 예입니다.

- Nest가 클래스를 인스턴스화하거나 캐시 된 인스턴스를 리턴하는 대신 사용자 정의 인스턴스를 작성하려고합니다.
- 두 번째 종속성에서 기존 클래스를 재사용하려고합니다
- 테스트를 위해 모의 버전으로 클래스를 재정의하려고합니다.

Nest를 사용하면 이러한 사례를 처리 할 사용자 지정 공급자를 정의 할 수 있습니다. 사용자 지정 공급자를 정의하는 몇 가지 방법을 제공합니다. 그들을 통해 봅시다.


### 값 프로바이더

이 useValue구문은 상수 값을 주입하거나 외부 라이브러리를 Nest 컨테이너에 넣거나 실제 구현을 모의 객체로 바꾸는 데 유용합니다. Nest가 CatsService테스트 목적으로 모의 객체를 사용하도록 강요한다고 가정 해 봅시다 .










If I may quote Gridsome themselves:

> Gridsome builds ultra performance into every page automatically. You get code splitting, asset optimization, progressive images, and link prefetching out of the box. With Gridsome you get almost perfect page speed scores by default.

In combination with [Netlify](https://www.netlify.com/) this theme gives you a perfect Lighthouse score out of the box.

## Simple Navigation

Any good documentation has great navigation. This theme has support for an organized sidebar fore cross-page navigation as well as an autmatic generated table of contents for each page in your documentation.

## Search

The search component which is shipped with this theme, automatically indexes all headlines in your markdown pages and provides instant client side search powered by [Fuse.js](https://fusejs.io/).

## Dark Mode

This seems to be a must have for any site in current year. Click the icon at the top of the page and try it out for yourself!

## TailwindCSS

This starter uses [TailwindCSS](https://tailwindcss.com/) for layout and styling. You can easily configure it by editing the `tailwind.config.js` file. [PurgeCSS](https://purgecss.com/) is included as well to keep the bundle size as low as possible and the website fast and snappy!

### Changing Colors

The most inportant colors are defined in the `src/layouts/Default.vue` file at the top of the `style` block via CSS variables. If you want to change the primary color to orange for example, you would simply touch that value there.

```css
:rrot {
  --color-ui-primary: theme('colors.orange.600');
}
```

## Make it your own

Of course this is just a starter to quickly get you going. After downloading and installing you can do whatever you want with this theme. Check out the `src` folder and take a look at the components.

Docc uses [TailwindCSS](https://tailwindcss.com/). Colors and spacing can easily configured. To change the accent color, you only need to touch a single line in the code.

Don't like how something was designed or implemented? Just change the code and **make it your way**.

### Contribute

If you find any spelling mistakes or have improvements to offer, I am open to anyone who has ideas and wants to contribute to this starter theme.