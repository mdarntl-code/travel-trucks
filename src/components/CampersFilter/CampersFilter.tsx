"use client";

import { useState } from "react";
import {
  CamperEngine,
  CamperForm,
  CamperTransmission,
  Filter,
} from "../../types/camper";
import styles from "./CampersFilter.module.css";

interface CampersFilterProps {
  onSearch: (filters: Filter) => void;
}

export default function CampersFilter({ onSearch }: CampersFilterProps) {
  const [filters, setFilters] = useState<Filter>({
    location: "",
    form: "",
    transmission: "",
    engine: "",
    ac: false,
    bathroom: false,
    kitchen: false,
    tv: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  });

  const handleChange = (field: keyof Filter, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters: Filter = {
      location: "",
      form: "",
      transmission: "",
      engine: "",
      ac: false,
      bathroom: false,
      kitchen: false,
      tv: false,
      radio: false,
      refrigerator: false,
      microwave: false,
      gas: false,
      water: false,
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Location</label>
        <div
          className={`${styles.inputWrapper} ${
            filters.location ? styles.inputWrapperActive : ""
          }`}
        >
          <svg className={styles.mapIcon} width="20" height="20">
            <use href="/icons/sprite.svg#icon-map" />
          </svg>
          <input
            type="text"
            placeholder="City"
            className={styles.input}
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>

      <h3 className={styles.title}>Filters</h3>

      <div className={styles.filterGroup}>
        <h4 className={styles.subTitle}>Camper form</h4>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={filters.form === "alcove"}
            className={styles.radio}
            onChange={(e) => handleChange("form", e.target.value as CamperForm)}
          />
          Alcove
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="panel_van"
            checked={filters.form === "panel_van"}
            className={styles.radio}
            onChange={(e) => handleChange("form", e.target.value as CamperForm)}
          />
          Panel Van
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="integrated"
            checked={filters.form === "integrated"}
            className={styles.radio}
            onChange={(e) => handleChange("form", e.target.value as CamperForm)}
          />
          Integrated
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="semi_integrated"
            checked={filters.form === "semi_integrated"}
            className={styles.radio}
            onChange={(e) => handleChange("form", e.target.value as CamperForm)}
          />
          Semi Integrated
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.subTitle}>Engine</h4>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="diesel"
            checked={filters.engine === "diesel"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("engine", e.target.value as CamperEngine)
            }
          />
          Diesel
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="petrol"
            checked={filters.engine === "petrol"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("engine", e.target.value as CamperEngine)
            }
          />
          Petrol
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            checked={filters.engine === "hybrid"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("engine", e.target.value as CamperEngine)
            }
          />
          Hybrid
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="electric"
            checked={filters.engine === "electric"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("engine", e.target.value as CamperEngine)
            }
          />
          Electric
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.subTitle}>Transmission</h4>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="transmission"
            value="automatic"
            checked={filters.transmission === "automatic"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("transmission", e.target.value as CamperTransmission)
            }
          />
          Automatic
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="transmission"
            value="manual"
            checked={filters.transmission === "manual"}
            className={styles.radio}
            onChange={(e) =>
              handleChange("transmission", e.target.value as CamperTransmission)
            }
          />
          Manual
        </label>
      </div>

      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
      <button className={styles.clearBtn} onClick={handleReset}>
        <svg className={styles.clearIcon} width="12" height="12">
          <use href="/icons/sprite.svg#icon-cross" />
        </svg>
        Clear filters
      </button>
    </aside>
  );
}
