import type { Schema, Struct } from '@strapi/strapi';

export interface FormsFormAgree extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_agrees';
  info: {
    displayName: 'Form Agree';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsFormCheckbox extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes_list';
  info: {
    displayName: 'Form Checkbox';
  };
  attributes: {
    isChecked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsFormCheckboxes extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes';
  info: {
    displayName: 'Form Checkboxes';
  };
  attributes: {
    items: Schema.Attribute.Component<'forms.form-checkbox', true>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['checkbox', 'radio']> &
      Schema.Attribute.DefaultTo<'checkbox'>;
  };
}

export interface FormsFormInput extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_inputs';
  info: {
    displayName: 'Form Input';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['text', 'email']>;
  };
}

export interface FormsFormSelect extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_selects';
  info: {
    displayName: 'Form Select';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'forms.form-select-options', true>;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormsFormSelectOptions extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_select_options';
  info: {
    displayName: 'Form Select Options';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface FormsFormSubmit extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_submits';
  info: {
    displayName: 'Form Submit';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface FormsFormTextarea extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_textareas';
  info: {
    displayName: 'Form Textarea';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    gallery: Schema.Attribute.Relation<'oneToOne', 'api::gallery.gallery'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsRequest extends Struct.ComponentSchema {
  collectionName: 'components_sections_requests';
  info: {
    displayName: 'Request';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsReviews extends Struct.ComponentSchema {
  collectionName: 'components_sections_reviews';
  info: {
    displayName: 'Reviews';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsSchedule extends Struct.ComponentSchema {
  collectionName: 'components_sections_schedules';
  info: {
    displayName: 'Schedule';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    leftText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    rightText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsService extends Struct.ComponentSchema {
  collectionName: 'components_sections_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SharedLocaleField extends Struct.ComponentSchema {
  collectionName: 'components_shared_locale_fields';
  info: {
    displayName: 'Locale Field';
  };
  attributes: {
    localeKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'en'>;
    localeValue: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedLocaleFieldReview extends Struct.ComponentSchema {
  collectionName: 'components_shared_locale_field_reviews';
  info: {
    displayName: 'Locale Field Review';
  };
  attributes: {
    localeKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'en'>;
    localeText: Schema.Attribute.RichText & Schema.Attribute.Required;
    localeTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    ogType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'website'>;
    ogUrl: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    structuredData: Schema.Attribute.Text;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image', 'app', 'player']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
    twitterDescription: Schema.Attribute.Text;
    twitterImage: Schema.Attribute.Media<'images'>;
    twitterTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'forms.form-agree': FormsFormAgree;
      'forms.form-checkbox': FormsFormCheckbox;
      'forms.form-checkboxes': FormsFormCheckboxes;
      'forms.form-input': FormsFormInput;
      'forms.form-select': FormsFormSelect;
      'forms.form-select-options': FormsFormSelectOptions;
      'forms.form-submit': FormsFormSubmit;
      'forms.form-textarea': FormsFormTextarea;
      'sections.about': SectionsAbout;
      'sections.gallery': SectionsGallery;
      'sections.hero': SectionsHero;
      'sections.request': SectionsRequest;
      'sections.reviews': SectionsReviews;
      'sections.schedule': SectionsSchedule;
      'sections.service': SectionsService;
      'sections.text-section': SectionsTextSection;
      'shared.locale-field': SharedLocaleField;
      'shared.locale-field-review': SharedLocaleFieldReview;
      'shared.seo': SharedSeo;
    }
  }
}
