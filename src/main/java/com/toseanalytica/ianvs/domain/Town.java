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
 * A Town.
 */
@Entity
@Table(name = "town")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Town implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "town")
    private String town;

    @ManyToOne
    @JsonIgnoreProperties("provinceTowns")
    private Province province;

    @OneToMany(mappedBy = "town")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branchTowns = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTown() {
        return town;
    }

    public Town town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public Province getProvince() {
        return province;
    }

    public Town province(Province province) {
        this.province = province;
        return this;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public Set<Branch> getBranchTowns() {
        return branchTowns;
    }

    public Town branchTowns(Set<Branch> branches) {
        this.branchTowns = branches;
        return this;
    }

    public Town addBranchTown(Branch branch) {
        this.branchTowns.add(branch);
        branch.setTown(this);
        return this;
    }

    public Town removeBranchTown(Branch branch) {
        this.branchTowns.remove(branch);
        branch.setTown(null);
        return this;
    }

    public void setBranchTowns(Set<Branch> branches) {
        this.branchTowns = branches;
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
        Town town = (Town) o;
        if (town.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), town.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Town{" +
            "id=" + getId() +
            ", town='" + getTown() + "'" +
            "}";
    }
}
