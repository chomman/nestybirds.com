<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
            NestyBirds
          </h2>
        </div>
        <!-- <h1 class="text-4xl text-center lg:text-5xl">
          스타트업 노트
        </h1> -->
        <p class="text-xl font-medium text-center">
          <!-- All of the really successful people I know have a really strong action bias. They just do things. -->
          내가 아는 정말 성공한 사람들은 모두 행동주의적 성향이 아주 강하다.
          <br>
          그들은 단지 뭔가를 할 뿐이다.
          <br>
          <strong class="text-ui-primary">- Naval Ravikant -</strong>
        </p>

        <div class="flex justify-center mt-8">
          <g-link
            to="/nestjs/"
            class="flex items-center px-6 py-4 ml-auto text-2xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
          >
            시작하기
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>

      </div>

<!--
      <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

      <div class="flex flex-wrap justify-center -mx-4">
        <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <BookIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            Zero to Sold
          </h3>
          <p class="text-lg text-left">
            <a>Avid Kahl</a>이 자신의 창업 노하우를 정리한 책. 스타트업에 관심이 있다면 읽어볼 것. 여기에서는 이 책의 주요 내용을 소개한다. <a class="border-b border-dashed border-ui-primary text-ui-primary">바로가기</a>.
          </p>
        </div>

        <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <GithubIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            관심 기술
          </h3>
          <p class="text-lg text-left">
            모든 창업이 IT 기술을 필요로 하는 것은 아니지만 많은 스타트업들이 그러하다. 관심있는 IT 기술들을 한글화하고 정리한다. <span class="border-b border-dashed border-ui-primary text-ui-primary">blink of an eye</span>.
          </p>
        </div>

        <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <MoonIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            Lights out
          </h3>
          <p class="text-lg text-left">
            Working late at night again? Enable dark mode with the click of a button.
          </p>
        </div>
      </div>

-->  

    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, BookIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon, GithubIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    BookIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon,
    GithubIcon
  },

  metaInfo() {
    const title = 'Great Documentation starts here';
    const description = 'DOCC is a starter theme with instant search and dark mode for writing great technical documentation. Based on Gridsome!';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ]
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
