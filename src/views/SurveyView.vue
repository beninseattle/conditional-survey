<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { parseSurveyJson, questionsForPage, type Survey, type SurveyJson } from '@/features/survey';
import surveyJson from '@/assets/surveyData.json';

const survey: Ref<Survey> = ref(parseSurveyJson(surveyJson as unknown as SurveyJson));
const page = ref(1);

const questions = questionsForPage(survey.value, page.value);
</script>

<template>
  <div class="survey">
    <h1>Survey page: {{ page }} with {{ questions.length }} questions</h1>
  </div>
</template>

<style></style>
