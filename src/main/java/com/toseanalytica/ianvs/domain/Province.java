package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Province.
 */
@Entity
@Table(name = "province")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Province implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "province")
    private String province;

    @ManyToOne
    @JsonIgnoreProperties("countryCounties")
    private Country country;

    @OneToMany(mappedBy = "province")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Town> provinceTowns = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvince() {
        return province;
    }

    public Province province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Country getCountry() {
        return country;
    }

    public Province country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<Town> getProvinceTowns() {
        return provinceTowns;
    }

    public Province provinceTowns(Set<Town> towns) {
        this.provinceTowns = towns;
        return this;
    }

    public Province addProvinceTown(Town town) {
        this.provinceTowns.add(town);
        town.setProvince(this);
        return this;
    }

    public Province removeProvinceTown(Town town) {
        this.provinceTowns.remove(town);
        town.setProvince(null);
        return this;
    }

    public void setProvinceTowns(Set<Town> towns) {
        this.provinceTowns = towns;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Province province = (Province) o;
        if (province.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), province.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Province{" +
            "id=" + getId() +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
