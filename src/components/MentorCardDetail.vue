<template>
  <div
    class="card bg-base-100 shadow-sm border border-base-200 overflow-hidden"
  >
    <div
      class="relative h-28 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-end px-6 pb-2"
    >
      <Pill
        class="absolute top-3 right-3"
        :tarifa="mentor.mentorProfile.tarifa"
      />
      <img
        :src="
          mentor.fotoUrl ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.nombre}`
        "
        class="w-16 h-16 rounded-xl bg-white border-4 border-white shadow-md -mb-4"
        alt="Foto Perfil"
      />
    </div>

    <div class="px-6 pt-8 pb-4 flex justify-between items-start gap-4">
      <div>
        <h3 class="card-title text-2xl font-bold">{{ mentor.nombre }}</h3>
        <p class="text-primary text-base font-semibold">
          {{ mentor.mentorProfile.titulo }}
        </p>
      </div>
      <div>
        <ButtonCommon @click="goToLinkedin"> Linkedin </ButtonCommon>
      </div>
    </div>

    <div class="card-body pt-0 flex-col md:flex-row gap-6">
      <div class="flex-1 flex flex-col gap-4">
        <div>
          <h4 class="font-semibold text-base-content text-xl mb-1">Sobre mí</h4>
          <p class="text-base-content/60 text-lg leading-relaxed">
            {{ mentor.mentorProfile.experiencia }}
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-base-content text-xl mb-2">
            Especialidades
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in mentor.mentorProfile.skills"
              :key="skill"
              class="badge badge-ghost badge-md font-bold uppercase tracking-wider"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-72">
        <DisponibilidadPanel
          :disponibilidad="mentor.mentorProfile.disponibilidad"
          @reservar="(slot) => $emit('reservar', { mentor, slot })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Pill from "./Pill.vue";
import DisponibilidadPanel from "./DisponibilidadPanel.vue";
import ButtonCommon from "./ButtonCommon.vue";

const props = defineProps({
  mentor: {
    type: Object,
    required: true,
  },
});

defineEmits(["reservar"]);

const goToLinkedin = () => {
  window.open(props.mentor.mentorProfile.linkedin, "_blank");
};
</script>
