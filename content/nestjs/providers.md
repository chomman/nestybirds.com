---
description: ''
sidebar: 'nestjs'
---

# Provider(공급자)

공급자는 Nest의 기본 개념입니다. 많은 기본 Nest 클래스는 service, repository, factory, helper 등을 공급자로 다룰 수 있습니다. 공급자의 주요 개념은 의존성을 주입할 수 있다는 것입니다. 즉, 개체가 서로 다양한 관계를 형성할 수 있으며, 개체의 인스턴스를 "연결"하는 기능을 Nest 런타임 시스템에 위임할 수 있습니다. 공급자는 단순히 `@Injectable()` 데코레이터로 주석이 달린 클래스일 뿐입니다.

![공급자의 개념도](https://docs.nestjs.com/assets/Components_1.png "공급자의 개념도")

이전 장에서는 간단한 `CatsController`를 만들었습니다. 컨트롤러는 HTTP 요청만 처리하고 더 복잡한 작업은 공급자에게 위임해야 합니다. 공급자는 클래스 선언 앞에 `@Injectable()` 데코레이터가 있는 일반 JavaScript 클래스입니다 .

> **힌트**

> Nest를 사용하면 좀 더 다양한 방법으로 종속성을 디자인하고 구성할 수 있으므로 [SOLID](https://en.wikipedia.org/wiki/SOLID) 원칙을 따르는 것이 좋습니다 .



## 서비스

간단한 `CatsService`를 만들어 시작하겠습니다. 이 서비스는 데이터 저장 및 검색을 담당하며 `CatsController`에서 사용하도록 설계되었으므로 공급자로 정의하는 것이 좋습니다. 따라서 클래스 앞에 `@Injectable()` 데코레이터를 추가합니다.

```js
// cats.service.ts

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

> **힌트**

> CLI를 사용하여 서비스를 만드려면, 간단히 `$ nest g service cats` 명령을 실행하십시오.

우리 `CatsService`는 하나의 속성과 두 가지 방법을 가진 기본 클래스입니다. 유일한 새로운 기능은 `@Injectable()` 데코레이터를 사용한다는 것입니다. `@Injectable()`은 메타데이터를 첨부하여, Nest에게 이 클래스가 Nest의 공급자라는 것을 알려줍니다. 그리고 다음 예제 `Cat`은 인터페이스로 사용되며 일반적으로 이런 형태로 보여집니다.

```js
// interfaces/cat.interface.ts

export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

이제 고양이를 검색할 수 있는 서비스 클래스가 생겼으니, `CatsController` 안에서 사용합시다:

```js
// cats.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

`CatsService`는 클래스 생성자를 통해 주입됩니다. `private` 구문의 사용에 유의하십시오. 이 짧은 구문은 동일한 곳에서 즉시 `catsService`를 정의하고 초기화할 수 있게 해줍니다.


#### 주석

- *이 페이지는 [Nest.js](https://docs.nestjs.com/providers)의 비공식 한글 번역본입니다.*