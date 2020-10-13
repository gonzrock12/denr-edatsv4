<template>
  <div>
    <v-card class="pb-3 px-6 pt-0">
      <v-card-title>
        <v-row>
          <v-col class="py-0">
            <v-icon medium color="green">
              mdi-file-document
            </v-icon>
            Details
          </v-col>
          <v-col class="py-0 text-right">
            <v-btn icon>
              <v-icon color="orange accent-4">
                mdi-file-eye
              </v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="primary">
                mdi-file-document-edit
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="4" class="py-0">
            Document #:
          </v-col>
          <v-col cols="8" class="py-0 font-weight-bold">
            {{ itemdetails.document.control_id }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Subject:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.document.subject }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Type:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.document.type }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Sender:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.document.sender }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Classification:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.document.classification }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Action Desired:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.action_desired }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Mode of Action:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.action_mode }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Forwarded by:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.division.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Date forwarded:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.arrival }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Status:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.status }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Remarks/Comments:
          </v-col>
          <v-col cols="8" class="py-0">
            {{ itemdetails.remarks }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0">
            Attachments:
          </v-col>
          <v-col v-if="itemdetails.document.files" cols="8" class="py-0">
            <span v-for="item in details.documents.files" :key="item.id">
              <a :href="item.path" target="__blank">{{ item.filename }}</a> |
            </span>
          </v-col>
          <v-col v-else class="py-0">
            <span>No Attachments</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    itemdetails: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>
